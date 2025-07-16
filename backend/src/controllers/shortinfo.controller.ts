import { Request, Response } from 'express';
import simpleTextModel from '../models/shortinfo.model';

export async function update(req: Request, res: Response) {
  const { itemKey } = req.params;
  const { data } = req.body;

  try {
    if (!(await simpleTextModel.findByPk(itemKey))) throw 'not found';
    await simpleTextModel.update({ data: data }, { where: { itemKey } });
    res.status(200).json({ message: 'simpletext updated' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getOne(req: Request, res: Response) {
  const { itemKey } = req.params;

  try {
    const item = await simpleTextModel.findByPk(itemKey);

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function create(req: Request, res: Response) {
  const { itemKey, data } = req.body;

  try {
    await simpleTextModel.create({ itemKey, data });
    console.log('Simple text ' + itemKey + ' created');
    res.status(200).json({ message: 'Simple text created' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const texts = await simpleTextModel.findAll({ attributes: ['itemKey'] });
    res.status(200).json(texts);
  } catch (error) {
    res.status(400).json({ error });
  }
}
