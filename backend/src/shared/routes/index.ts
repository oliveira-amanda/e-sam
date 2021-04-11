import { Router } from 'express';
import evaluationsRouter from '../infra/http/routes/node_modules/@modules/evaluations/infra/http/routes/evaluations.routes';
import usersRouter from '../infra/http/routes/node_modules/@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../infra/http/routes/node_modules/@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/evaluations', evaluationsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
