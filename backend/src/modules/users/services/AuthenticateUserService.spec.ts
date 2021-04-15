import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashEvaluator from '../evaluator/HashEvaluator/fakes/FakeHashEvaluator';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashEvaluator = new FakeHashEvaluator();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashEvaluator
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashEvaluator,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashEvaluator = new FakeHashEvaluator();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashEvaluator,
    );

    await expect(authenticateUser.execute({
			email: 'joao@teste.com',
			password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
  
  it('it should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashEvaluator = new FakeHashEvaluator();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashEvaluator
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashEvaluator,
    );

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