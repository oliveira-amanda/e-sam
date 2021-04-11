import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/userAvatarController';

import UsersControler from '../controllers/UsersControler';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersControler = new UsersControler();
const userAvatarControler = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersControler.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControler.update,
);

export default usersRouter;
