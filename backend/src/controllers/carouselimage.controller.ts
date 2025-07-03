import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import carouselImageModel from '../models/carouselimage.model';

export async function create(req: Request, res: Response) {
  const { carouselId } = req.params;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `ci-${timestamp.split(' ').join('_')}-${originalname?.split(' ').join('_')}.webp`;

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access('files/carousels', error => {
    if (error) fs.mkdirSync('files/carousels');
  });

  try {
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile('files/carousels/' + ref);

    await carouselImageModel.create({
      carouselId,
      alt: 'Texte alt',
      path: 'carousels/' + ref,
    });

    res.status(200).json({ message: 'Carousel image updated' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getCarousel(req: Request, res: Response) {
  const { carouselId } = req.params;
  const result = [] as {
    id: number;
    url: string;
    alt: string;
    title: string;
    desc: string;
    color: string;
  }[];

  try {
    const item = await carouselImageModel.findAll({
      where: { carouselId: carouselId },
    });

    item.forEach(i => {
      const decoded = i.toJSON();
      result.push({
        id: decoded.id,
        url: `${process.env.HOST}/files/${decoded.path}`,
        alt: decoded.alt,
        title: decoded.title,
        desc: decoded.desc,
        color: decoded.color,
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await carouselImageModel.findByPk(id);
    const decoded = item?.toJSON() as {
      id: number;
      carouselId: string;
      path: string;
    };

    fs.unlink('files/' + decoded.path, error => {
      console.log(error);
    });
    await carouselImageModel.destroy({
      where: { id },
    });

    res.status(200).json({ message: 'Carousel image deleted' });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
}

export async function modifyDesc(req: Request, res: Response) {
  const { desc, title, alt, url, color } = req.body;
  const { id } = req.params;

  try {
    await carouselImageModel.update(
      { desc, title, alt, url, color },
      { where: { id: id } },
    );
    res.status(200).json({ message: 'carousel image modified' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function modifyImage(req: Request, res: Response) {
  const { id } = req.params;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `ci-${timestamp}-${originalname}.webp`.split(' ').join('_');

  try {
    const item = await carouselImageModel.findByPk(id);
    const decoded = item?.toJSON();

    if (decoded.path) {
      fs.unlink('files/' + decoded.path, error => {
        if (error) console.log(error);
      });
    }
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile('files/carousels/' + ref);

    await carouselImageModel.update(
      { path: 'carousels/' + ref },
      { where: { id: id } },
    );

    res.status(200).json({ message: 'carousel image updated' });
  } catch (error) {
    res.status(400).json(error);
  }
}
