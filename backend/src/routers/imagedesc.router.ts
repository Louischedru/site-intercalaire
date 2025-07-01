import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/imagedesc.controller';
import auth from '../middlewares/auth.middleware';

const imageDescRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

imageDescRouter.get('/:list', controller.getList);
imageDescRouter.post('/', auth, upload.single('file'), controller.create);
imageDescRouter.put('/modifydesc:id', auth, controller.modifyDesc);
imageDescRouter.put(
  '/modifyimage/:id',
  auth,
  upload.single('file'),
  controller.modifyImage,
);
imageDescRouter.delete('/:id', auth, controller.deleteOne);

export default imageDescRouter;
