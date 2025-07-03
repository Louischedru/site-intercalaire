import { Router } from 'express';
import * as shortInfoController from '../controllers/shortinfo.controller';
import authMidddleware from '../middlewares/auth.middleware';

const shortInfoRouter = Router();

shortInfoRouter.put('/:itemKey', authMidddleware, shortInfoController.update);
shortInfoRouter.get('/:itemKey', shortInfoController.getOne);
shortInfoRouter.post('/', shortInfoController.create);
shortInfoRouter.get('/', shortInfoController.getAll);

export default shortInfoRouter;
