import filmarticleModel from '../models/filmarticle.model';
import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

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
        poster: `${process.env.HOST}/files/${decoded.path}`,
        title: decoded.title,
        desc: decoded.desc,
        id: decoded.id,
      });
    });
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
        poster: `${process.env.HOST}/files/${decoded.poster}`,
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
        poster: `${process.env.HOST}/files/${decoded.poster}`,
        title: decoded.title,
        desc: decoded.desc,
        info: decoded.info,
        synopsis: decoded.synopsis,
        url: decoded.url,
        article: decoded.article,
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
      poster: `${process.env.HOST}/files/${decoded.poster}`,
      title: decoded.title,
      desc: decoded.desc,
      info: decoded.info,
      synopsis: decoded.synopsis,
      url: decoded.url,
      article: decoded.article,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function create(req: Request, res: Response) {
  const { title, desc, article, page, synopsis, info, url } = req.body;

  try {
    const result = await filmarticleModel.create({
      title,
      desc,
      article,
      incoming: page == 'avenir' ? true : false,
      synopsis,
      info,
      url,
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
  fs.access('files/filmposters', error => {
    if (error) fs.mkdirSync('files/filmposters');
  });

  try {
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile('files/filmposters/' + ref);

    await filmarticleModel.update(
      { path: 'filmposters/' + ref },
      { where: { id } },
    );

    res.status(200).json({ message: 'Film article poster updated' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function modifyOther(req: Request, res: Response) {
  const { id } = req.params;
  const { title, desc, article, page, synopsis, info, url } = req.body;

  try {
    await filmarticleModel.update(
      {
        title,
        desc,
        incoming: page == 'avenir' ? true : false,
        article,
        synopsis,
        info,
        url,
      },
      { where: { id } },
    );
    res.status(200).json({ message: 'Film article updated' });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function setIsPublished(req: Request, res: Response) {
  const { id } = req.params;
  const { published } = req.body;

  try {
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

    if (decoded.poster) {
      fs.unlink('files/' + decoded.path, error => {
        console.log(error);
      });
    }
    await filmarticleModel.destroy({ where: { id } });
    res.status(200).json({ message: 'Film articled deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}
