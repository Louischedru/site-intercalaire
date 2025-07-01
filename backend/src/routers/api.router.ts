import { Router } from 'express';
import authRouter from './auth.router';
import simpleTextRouter from './simpletext.routeer';
import loginTestRouter from './logintest.router';
import simpleImageRouter from './simpleimage.router';
import carouselImageRouter from './carouselimage.router';
import imageDescRouter from './imagedesc.router';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/simpletext', simpleTextRouter);
apiRouter.use('/logintest', loginTestRouter);
apiRouter.use('/simpleimage', simpleImageRouter);
apiRouter.use('/carousel', carouselImageRouter);
apiRouter.use('/imagedesc', imageDescRouter);

export default apiRouter;
