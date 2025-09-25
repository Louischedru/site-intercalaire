import * as controller from '../controllers/articleimage.controller';
import { Router } from 'express';
import auth from '../middlewares/auth.middleware';
import multer from 'multer';

const carouselImageRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const articleimageRouter = Router();

articleimageRouter.get('/:id', controller.getOne);
articleimageRouter.post('/', auth, upload.single('file'), controller.create);
articleimageRouter.put('/alt/:id', auth, controller.modifyAlt);
articleimageRouter.put(
  '/image/:id',
  auth,
  upload.single('file'),
  controller.modifyImage,
);
articleimageRouter.delete('/:id', auth, controller.deleteOne);

export default articleimageRouter;
