import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomJWTPayload extends JwtPayload {
  userId: string;
}

export default function authMidddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization as string;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET || '123',
    (error: any, decoded: any) => {
      if (error) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
      const auth = decoded as CustomJWTPayload;
      req.headers.userId = auth.userId;
      next();
    },
  );
}
