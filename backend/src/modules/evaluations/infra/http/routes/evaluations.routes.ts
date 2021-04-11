import { Router } from 'express';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EvaluationsController from '../controllers/EvaluationsController';

const evaluationsRouter = Router();
const evaluationsController = new EvaluationsController();

evaluationsRouter.use(ensureAthenticated);

evaluationsRouter.post('/', evaluationsController.create);

export default evaluationsRouter;
