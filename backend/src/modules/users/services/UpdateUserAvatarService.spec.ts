import FakeStorageEvaluator from '@shared/container/evaluators/StorageEvaluator/fakes/FakeStorageEvaluator';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

  let fakeUsersRepository: FakeUsersRepository;
  let fakeStorageEvaluator: FakeStorageEvaluator;
  let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageEvaluator = new FakeStorageEvaluator();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageEvaluator
    );
  })

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'nao-existe-usuario',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageEvaluator, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    })

    await updateUserAvatar.execute({ 
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});