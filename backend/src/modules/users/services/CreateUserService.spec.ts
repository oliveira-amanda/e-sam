import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashEvaluator from '../evaluator/HashEvaluator/fakes/FakeHashEvaluator';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashEvaluator = new FakeHashEvaluator();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashEvaluator
    );
    const user = await createUser.execute({
			name: 'João',
			email: 'joao@teste.com',
			password: '123456',
    });
    expect(user).toHaveProperty('id');
	});
	
	it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashEvaluator = new FakeHashEvaluator();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashEvaluator
    );
    await createUser.execute({
			name: 'João',
			email: 'joao@teste.com',
			password: '123456',
    });
    
    await expect(
			createUser.execute({
				name: 'João',
				email: 'joao@teste.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
  });
});