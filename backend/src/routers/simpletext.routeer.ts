import { Router } from 'express';
import * as simpleTextController from '../controllers/simpltext.controller';
import authMidddleware from '../middlewares/auth.middleware';

const simpleTextRouter = Router();

simpleTextRouter.put('/:itemkey', authMidddleware, simpleTextController.update);
simpleTextRouter.get('/:itemkey', simpleTextController.getOne);
simpleTextRouter.post('/', simpleTextController.create);
simpleTextRouter.get('/', simpleTextController.getAll);

export default simpleTextRouter;
