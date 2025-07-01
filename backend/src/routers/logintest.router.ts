import * as loginTestController from '../controllers/logintest.controller';
import authMidddleware from '../middlewares/auth.middleware';
import { Router } from 'express';

const loginTestRouter = Router();

loginTestRouter.get('/', authMidddleware, loginTestController.loginTest);

export default loginTestRouter;
