
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';
import { check } from 'prettier';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
