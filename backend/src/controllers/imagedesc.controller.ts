import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import dotenv from 'dotenv';
import imageDescModel from '../models/imagedesc.model';

dotenv.config();

export async function create(req: Request, res: Response) {
  console.log(req.body);
  console.log('==============================================================');
  const { desc, list } = req.body;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `id-${timestamp}-${originalname}.webp`.split(' ').join('_');

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access('files/imagedesc', error => {
    if (error) fs.mkdirSync('files/imagedesc');
  });

  try {
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile('files/imagedesc/' + ref);

    await imageDescModel.create({
      path: 'imagedesc/' + ref,
      desc: desc,
      list: list,
    });
    res.status(200).json({ message: 'ok' });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
}

export async function getList(req: Request, res: Response) {
  const { list } = req.params;

  try {
    const items = await imageDescModel.findAll({ where: { list: list } });
    const toSend = [] as { id: number; url: string; desc: string }[];

    items.forEach(i => {
      const decoded = i.toJSON();

      toSend.push({
        id: decoded.id,
        url: `${process.env.HOST}/files/${decoded.path}`,
        desc: decoded.desc,
      });
    });

    res.status(200).json(toSend);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function modifyDesc(req: Request, res: Response) {
  const { desc } = req.body;
  const { id } = req.params;

  try {
    await imageDescModel.update({ desc: desc }, { where: { id: id } });
    res.status(200).json({ message: 'image desc modified' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function modifyImage(req: Request, res: Response) {
  const { id } = req.params;
  const { desc, list } = req.body;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `id-${timestamp}-${originalname}.webp`.split(' ').join('_');

  try {
    const item = await imageDescModel.findByPk(id);
    const decoded = item?.toJSON();

    if (decoded.path && decoded.path) {
      fs.unlink('files/' + decoded.path, error => {
        if (error) console.log(error);
      });
    }
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile('files/imagedesc/' + ref);

    await imageDescModel.update(
      { path: 'imagedesc/' + ref },
      { where: { id: id } },
    );

    res.status(200).json({ message: 'image updated' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = (await imageDescModel.findByPk(id))?.toJSON();
    if (item.path) {
      fs.unlink('files/' + item.path, error => {
        if (error) console.log(error);
      });
    }
    await imageDescModel.destroy({ where: { id: id } });
    res.status(200).json({ message: 'imagedesc deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}
