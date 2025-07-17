import filmarticleModel from '../models/filmarticle.model';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import articleimageModel from '../models/articleimage.model';

const folderName = 'article-posters';
const filePath = path.join('files', folderName);

export async function getAllPublished(req: Request, res: Response) {
  const { page } = req.params;
  const toReturn = [] as {
    poster: string;
    title: string;
    desc: string;
    id: number;
  }[];

  try {
    const items = await filmarticleModel.findAll({
      where: { incoming: page == 'nosprojets' ? false : true, published: true },
    });

    items.forEach(i => {
      const decoded = i.toJSON();
      toReturn.push({
        poster: `${process.env.HOST}/files/${folderName}/${decoded.poster}`,
        title: decoded.title,
        desc: decoded.desc,
        id: decoded.id,
      });
    });
    res.status(200).json(toReturn);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getAllDrafts(req: Request, res: Response) {
  const { page } = req.params;
  const toReturn = [] as {
    poster: string;
    title: string;
    desc: string;
    id: number;
  }[];

  try {
    const items = await filmarticleModel.findAll({
      where: {
        incoming: page == 'nosprojets' ? false : true,
        published: false,
      },
    });

    items.forEach(i => {
      const decoded = i.toJSON();
      toReturn.push({
        poster: `${process.env.HOST}/files/${folderName}/${decoded.poster}`,
        title: decoded.title,
        desc: decoded.desc,
        id: decoded.id,
      });
    });
    res.status(200).json(toReturn);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getOnePublic(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await filmarticleModel.findByPk(id);
    const decoded = item?.toJSON();
    if (!decoded.published) res.status(400).json({ error: 'not allowed' });
    else
      res.status(200).json({
        poster: `${process.env.HOST}/files/${folderName}/${decoded.poster}`,
        title: decoded.title,
        desc: decoded.desc,
        info: decoded.info,
        synopsis: decoded.synopsis,
        url: decoded.url,
        article: decoded.article,
        images: decoded.images,
      });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getOnePrivate(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await filmarticleModel.findByPk(id);
    const decoded = item?.toJSON();
    res.status(200).json({
      poster: `${process.env.HOST}/files/${folderName}/${decoded.poster}`,
      title: decoded.title,
      desc: decoded.desc,
      info: decoded.info,
      synopsis: decoded.synopsis,
      url: decoded.url,
      article: decoded.article,
      images: decoded.images,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function create(req: Request, res: Response) {
  const { title, desc, article, page, synopsis, info, url, images } = req.body;

  try {
    const result = await filmarticleModel.create({
      title,
      desc,
      article,
      incoming: page == 'avenir' ? true : false,
      synopsis,
      info,
      url,
      images: images ? images : '',
      poster: 'default-image.jpg',
      published: false,
    });
    res.status(200).json({ id: result.toJSON().id });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function modifyPoster(req: Request, res: Response) {
  const { id } = req.params;
  const { buffer, originalname } = req.file || {
    buffer: undefined,
    originalname: undefined,
  };
  const timestamp = new Date().toString();
  const ref = `fp-${timestamp.split(' ').join('_')}-${originalname?.split(' ').join('_')}.webp`;

  fs.access('files', error => {
    if (error) fs.mkdirSync('files');
  });
  fs.access(filePath, error => {
    if (error) fs.mkdirSync(filePath);
  });

  try {
    const item = await filmarticleModel.findByPk(id);
    if (!item) throw 'Not found';
    if (!buffer) throw 'No file provided';
    const decoded = item.toJSON();
    await sharp(buffer).webp({ quality: 20 }).toFile(path.join(filePath, ref));

    if (decoded.poster != 'default-image.jpg') {
      fs.unlink(path.join(filePath, decoded.poster), error => {
        if (error) console.log(error);
      });
    }

    await filmarticleModel.update({ poster: ref }, { where: { id } });

    res.status(200).json({ message: 'Film article poster updated' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function modifyOther(req: Request, res: Response) {
  const { id } = req.params;
  const { title, desc, article, page, synopsis, info, url, images } = req.body;

  const strIds = images.split(';') as string[];
  const imagesIds = [] as number[];

  strIds.forEach(elem => {
    imagesIds.push(parseInt(elem));
  });

  try {
    const item = await filmarticleModel.findByPk(id);
    if (!item) throw 'Not found';
    const decoded = item.toJSON();
    const strItemIds = decoded.images.split(';') as string[];
    const itemIds = [] as number[];

    strItemIds.forEach(elem => {
      const n = parseInt(elem);
      if (!isNaN(n)) itemIds.push(n);
    });
    console.log(itemIds);
    itemIds.forEach(async elem => {
      if (!imagesIds.includes(elem)) {
        console.log('Deleted:', elem);
        await deleteOneImage(elem);
      }
    });
    await filmarticleModel.update(
      {
        title,
        desc,
        incoming: page == 'avenir' ? true : false,
        article,
        synopsis,
        info,
        url,
        images,
      },
      { where: { id } },
    );
    res.status(200).json({ message: 'Film article updated' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function setIsPublished(req: Request, res: Response) {
  const { id } = req.params;
  const { published } = req.body;

  try {
    if (!(await filmarticleModel.findByPk(id))) throw 'Not found';
    await filmarticleModel.update({ published }, { where: { id } });
    res.status(200).json({ message: 'Publishing toggled' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const item = await filmarticleModel.findByPk(id);
    const decoded = item?.toJSON();

    if (decoded.poster != 'default-image.jpg') {
      fs.unlink(path.join(filePath, decoded.poster), error => {
        console.log(error);
      });
    }

    await deleteImages(decoded.images);

    await filmarticleModel.destroy({ where: { id } });
    res.status(200).json({ message: 'Film articled deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function deleteImages(images: string) {
  const strIds = images.split(';');
  const ids = [] as number[];

  strIds.forEach(elem => {
    const n = parseInt(elem);
    if (!isNaN(n)) ids.push(n);
  });

  try {
    ids.forEach(async id => {
      const item = await articleimageModel.findByPk(id);
      const decoded = item?.toJSON();

      fs.unlink(path.join('files', 'article-images', decoded.path), error => {
        console.log(error);
      });

      await articleimageModel.destroy({ where: { id } });
    });
    return 0;
  } catch (error) {
    return -1;
  }
}

async function deleteOneImage(id: number) {
  try {
    const item = await articleimageModel.findByPk(id);
    const decoded = item?.toJSON();

    fs.unlink(path.join('files', 'article-images', decoded.path), error => {
      console.log(error);
    });

    await articleimageModel.destroy({ where: { id } });
    return 0;
  } catch (error) {
    return -1;
  }
}
