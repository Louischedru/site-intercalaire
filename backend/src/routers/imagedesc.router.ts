import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/imagedesc.controller';
import auth from '../middlewares/auth.middleware';

const imageDescRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

imageDescRouter.get('/:list', controller.getList);
imageDescRouter.put(
  '/create/:list',
  auth,
  upload.single('file'),
  controller.create,
);
imageDescRouter.put('/modifyother/:id', auth, controller.modifyDesc);
imageDescRouter.put(
  '/modifyimage/:id',
  auth,
  upload.single('file'),
  controller.modifyImage,
);
imageDescRouter.delete('/:id', auth, controller.deleteOne);

export default imageDescRouter;
