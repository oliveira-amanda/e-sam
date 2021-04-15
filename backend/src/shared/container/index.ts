import { container } from 'tsyringe';
import './evaluators';
import '@modules/users/evaluator';

import IEvaluationsRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import EvaluationsRepository from '@modules/evaluations/infra/typeorm/repositories/EvaluationsRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IEvaluationsRepository>(
  'EvaluationsRepository', 
  EvaluationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository', 
  UserTokensRepository
);