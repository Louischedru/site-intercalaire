import articleimageModel from '../models/articleimage.model';
import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

export async function getOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await articleimageModel.findByPk(id);
    const decoded = item?.toJSON();
    res.status(200).json({
      url: `${process.env.HOST}/files/${decoded.path}`,
      alt: decoded.alt,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function create(req: Request, res: Response) {
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `ai-${timestamp.split(' ').join('_')}-${originalname?.split(' ').join('_')}.webp`;

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access('files/carousels', error => {
    if (error) fs.mkdirSync('files/articleimages');
  });

  try {
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile('files/articleimages/' + ref);

    const item = await articleimageModel.create({
      alt: '',
      path: 'articleimages/' + ref,
    });

    res.status(200).json({ id: item.toJSON().id });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function modifyAlt(req: Request, res: Response) {
  const { id } = req.params;
  const { alt } = req.body;

  try {
    await articleimageModel.update({ alt }, { where: { id } });
    res.status(200).json({ message: 'Article image alt modified' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await articleimageModel.findByPk(id);
    const decoded = item?.toJSON();

    fs.unlink(decoded.path, error => {
      console.log(error);
    });

    await articleimageModel.destroy({ where: { id } });
    res.status(200).json({ message: 'Article image deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}
