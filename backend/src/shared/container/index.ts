import { container } from 'tsyringe';
import '@modules/users/providers';

import IEvaluationsRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import EvaluationsRepository from '@modules/evaluations/infra/typeorm/repositories/EvaluationsRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IEvaluationsRepository>(
  'EvaluationsRepository', 
  EvaluationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
);