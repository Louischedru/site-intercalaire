import { Request, Response } from 'express';

export function loginTest(req: Request, res: Response) {
  res.status(200).json({ message: 'Login OK' });
}
