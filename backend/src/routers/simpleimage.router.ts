import { Router } from 'express';
import multer from 'multer';
import auth from '../middlewares/auth.middleware';
import * as controller from '../controllers/simpleimage.controller';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const simpleImageRouter = Router();

simpleImageRouter.get('/:itemKey', controller.getOne);
simpleImageRouter.post('/', auth, controller.create);
simpleImageRouter.put(
  '/image/:itemKey',
  upload.single('file'),
  controller.update,
);
simpleImageRouter.get('/', controller.getAll);
simpleImageRouter.put('/alt/:itemKey', auth, controller.upadateAlt);

export default simpleImageRouter;
