import { Router } from 'express';
import * as controller from '../controllers/filmarticle.controller';
import multer from 'multer';
import auth from '../middlewares/auth.middleware';

const carouselImageRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const filmarticleRouter = Router();

filmarticleRouter.get('/published/:page', controller.getAllPublished);
filmarticleRouter.get('/drafts/:page', auth, controller.getAllDrafts);
filmarticleRouter.get('/onepublic/:id', controller.getOnePublic);
filmarticleRouter.get('/onedraft/:id', auth, controller.getOnePrivate);
filmarticleRouter.post('/', auth, controller.create);
filmarticleRouter.put(
  '/poster/:id',
  auth,
  upload.single('file'),
  controller.modifyPoster,
);
filmarticleRouter.put('/other', auth, controller.modifyOther);
filmarticleRouter.delete('/:id', auth, controller.deleteOne);

export default filmarticleRouter;
