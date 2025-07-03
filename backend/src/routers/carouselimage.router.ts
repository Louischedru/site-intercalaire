import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/carouselimage.controller';
import auth from '../middlewares/auth.middleware';

const carouselImageRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

carouselImageRouter.get('/:carouselId', controller.getCarousel);
carouselImageRouter.put(
  '/create/:carouselId',
  auth,
  upload.single('file'),
  controller.create,
);
carouselImageRouter.delete('/:id', auth, controller.deleteOne);
carouselImageRouter.put('/modifyother/:id', auth, controller.modifyDesc);
carouselImageRouter.put(
  '/modifyimage/:id',
  auth,
  upload.single('file'),
  controller.modifyImage,
);

export default carouselImageRouter;
