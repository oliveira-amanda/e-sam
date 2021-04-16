import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashEvaluator from '../evaluator/HashEvaluator/fakes/FakeHashEvaluator';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashEvaluator: FakeHashEvaluator;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashEvaluator = new FakeHashEvaluator();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashEvaluator
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashEvaluator,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'João',
      email: 'joao@teste.com',
			password: '123456',
    })

    const response = await authenticateUser.execute({
			email: 'joao@teste.com',
			password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  
  it('should bot be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
			email: 'joao@teste.com',
			password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
  
  it('it should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'João',
      email: 'joao@teste.com',
			password: '123456',
    }) 

    await expect(authenticateUser.execute({
			email: 'joao@teste.com',
			password: 'senha-incorreta',
    })).rejects.toBeInstanceOf(AppError);
  });
});