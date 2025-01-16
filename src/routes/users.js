import {Router} from 'express';
import { getUsers } from '../controller/users.js';

const usersRouter = Router();

usersRouter.get('/data', getUsers)

export default usersRouter;