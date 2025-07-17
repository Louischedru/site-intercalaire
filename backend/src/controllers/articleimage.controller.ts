import articleimageModel from '../models/articleimage.model';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const folderName = 'article-images';
const filePath = path.join('files', folderName);

export async function getOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await articleimageModel.findByPk(id);
    const decoded = item?.toJSON();
    res.status(200).json({
      url: `${process.env.HOST}/files/${folderName}/${decoded.path}`,
      alt: decoded.alt,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function create(req: Request, res: Response) {
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `ai-${timestamp}-${originalname}.webp`.split(' ').join('_');

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access(filePath, error => {
    if (error) fs.mkdirSync(filePath);
  });

  try {
    if (!buffer) throw 'No file provided';
    await sharp(buffer).webp({ quality: 20 }).toFile(path.join(filePath, ref));

    const item = await articleimageModel.create({
      alt: '',
      path: ref,
    });

    res.status(200).json({ id: item.toJSON().id });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function modifyAlt(req: Request, res: Response) {
  const { id } = req.params;
  const { alt } = req.body;

  try {
    if (!(await articleimageModel.findByPk(id))) throw 'Not found';
    await articleimageModel.update({ alt }, { where: { id } });
    res.status(200).json({ message: 'Article image alt modified' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await articleimageModel.findByPk(id);
    const decoded = item?.toJSON();

    fs.unlink(path.join(filePath, decoded.path), error => {
      console.log(error);
    });

    await articleimageModel.destroy({ where: { id } });
    res.status(200).json({ message: 'Article image deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}
