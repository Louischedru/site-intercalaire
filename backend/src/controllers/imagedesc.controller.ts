import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import imageDescModel from '../models/imagedesc.model';
import path from 'path';

const folderName = 'imagedescs';
const filePath = path.join('files', folderName);

export async function create(req: Request, res: Response) {
  const { list } = req.params;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `id-${timestamp}-${originalname}.webp`.split(' ').join('_');

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access(filePath, error => {
    if (error) fs.mkdirSync(filePath);
  });

  try {
    if (!buffer) throw 'No file provided';
    await sharp(buffer).webp({ quality: 20 }).toFile(path.join(filePath, ref));

    const item = await imageDescModel.create({
      path: ref,
      title: '',
      desc: '',
      list,
      alt: '',
    });
    res.status(200).json({ id: item?.toJSON().id });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
}

export async function getList(req: Request, res: Response) {
  const { list } = req.params;

  try {
    const items = await imageDescModel.findAll({ where: { list: list } });
    const toSend = [] as {
      id: number;
      url: string;
      desc: string;
      title: string;
      alt: string;
    }[];

    items.forEach(i => {
      const decoded = i.toJSON();

      toSend.push({
        id: decoded.id,
        url: `${process.env.HOST}/files/${folderName}/${decoded.path}`,
        desc: decoded.desc,
        title: decoded.title,
        alt: decoded.alt,
      });
    });

    res.status(200).json(toSend);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function modifyDesc(req: Request, res: Response) {
  const { desc, title, alt } = req.body;
  const { id } = req.params;

  try {
    if (!(await imageDescModel.findByPk(id))) throw 'Not found';
    await imageDescModel.update({ desc, title, alt }, { where: { id: id } });
    res.status(200).json({ message: 'image desc modified' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function modifyImage(req: Request, res: Response) {
  const { id } = req.params;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `id-${timestamp}-${originalname}.webp`.split(' ').join('_');

  try {
    const item = await imageDescModel.findByPk(id);
    if (!item) throw 'Not found';
    const decoded = item?.toJSON();

    fs.unlink(path.join(filePath, decoded.path), error => {
      if (error) console.log(error);
    });
    await sharp(buffer).webp({ quality: 20 }).toFile(path.join(filePath, ref));

    await imageDescModel.update({ path: ref }, { where: { id: id } });

    res.status(200).json({ message: 'image updated' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = (await imageDescModel.findByPk(id))?.toJSON();
    if (item.path) {
      fs.unlink(path.join(filePath, item.path), error => {
        if (error) console.log(error);
      });
    }
    await imageDescModel.destroy({ where: { id: id } });
    res.status(200).json({ message: 'imagedesc deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}
