import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/sign', authController.signup);

export default authRouter;
