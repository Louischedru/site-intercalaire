import { Request, Response } from 'express';
import simpleImageModel from '../models/simpleimage.model';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const folderName = 'simple-images';
const filePath = path.join('files', 'simple-images');

export async function create(req: Request, res: Response) {
  const { itemKey } = req.body;

  try {
    await simpleImageModel.create({
      itemKey: itemKey,
      path: 'default-image.jpg',
      alt: 'default image',
    });
    res.status(200).json({ message: 'Simple image created' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function update(req: Request, res: Response) {
  const { itemKey } = req.params;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `si-${timestamp}-${originalname}.webp`.split(' ').join('_');

  console.log(req.file);

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access(filePath, error => {
    if (error) fs.mkdirSync(filePath);
  });

  try {
    if (!buffer) throw 'No file provided';
    if (!(await simpleImageModel.findByPk(itemKey))) throw 'not found';

    await simpleImageModel.findByPk(itemKey);
    const item = await simpleImageModel.findByPk(itemKey);
    const decoded = item?.toJSON() as { itemKey: string; path: string };

    if (decoded.path != 'default-image.jpg') {
      fs.unlink(path.join(filePath, decoded.path), error => {
        if (error) console.log(error);
      });
    }

    await sharp(buffer).webp({ quality: 20 }).toFile(path.join(filePath, ref));

    await simpleImageModel.update(
      { path: ref },
      { where: { itemKey: itemKey } },
    );
    res.status(200).json({ message: 'Simple image updated' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function upadateAlt(req: Request, res: Response) {
  const { alt } = req.body;
  const { itemKey } = req.params;
  try {
    if (!(await simpleImageModel.findByPk(itemKey))) throw 'not found';
    await simpleImageModel.update({ alt }, { where: { itemKey } });
    res.status(200).json({ message: 'Simple image alt modified' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const { itemKey } = req.params;
    const item = await simpleImageModel.findByPk(itemKey);
    const decoded = item?.toJSON();

    res.status(200).json({
      url: `${process.env.HOST}/files/${folderName}/${decoded.path}`,
      alt: decoded.alt,
    });
  } catch (error) {
    res.status(404).json(error);
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const items = await simpleImageModel.findAll({ attributes: ['itemKey'] });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
}
