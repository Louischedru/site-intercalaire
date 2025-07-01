import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/carouselimage.controller';
import auth from '../middlewares/auth.middleware';

const carouselImageRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

carouselImageRouter.get('/:carouselId', controller.getCarousel);
carouselImageRouter.put(
  '/:carouselId',
  auth,
  upload.single('file'),
  controller.create,
);
carouselImageRouter.delete('/:carouselId', auth, controller.deleteOne);

export default carouselImageRouter;
