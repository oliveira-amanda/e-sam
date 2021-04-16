import { Router } from 'express';
import UserAvatarController from '../controllers/userAvatarController';

import ProfileControler from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileControler = new ProfileControler();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileControler.update);

export default profileRouter;
