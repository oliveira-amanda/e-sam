import FakeHashEvaluator from '../evaluator/HashEvaluator/fakes/FakeHashEvaluator';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashEvaluator: FakeHashEvaluator;
  let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashEvaluator = new FakeHashEvaluator();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashEvaluator
    );
  })

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria',
      email: 'maria@teste.com'
    });

    expect(updatedUser.name).toBe('Maria');
    expect(updatedUser.email).toBe('maria@teste.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Joana',
      email: 'joana@teste.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'Pedro',
      email: 'pedro@teste.com',
      password: '123456',
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Maria',
      email: 'joao@teste.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria',
      email: 'maria@teste.com',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Maria',
        email: 'maria@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Maria',
        email: 'maria@teste.com',
        old_password: 'wrong',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
