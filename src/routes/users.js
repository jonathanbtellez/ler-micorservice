import {Router} from 'express';
import { destroy, getByEmail, getById, getUsers, postUser, putUser } from '../controller/users.js';

const usersRouter = Router();

usersRouter.get('/data', getUsers)
usersRouter.post('/user', postUser)
usersRouter.put('/user/:id', putUser)
usersRouter.get("/user/email/:email?", getByEmail)
usersRouter.get("/user/:id", getById)
usersRouter.delete("/user/:id", destroy)

export default usersRouter;