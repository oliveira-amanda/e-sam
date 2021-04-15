import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import IMailEvaluator from '@shared/container/evaluators/MailEvaluator/models/IMailEvaluator';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('MailEvaluator')
    private mailEvaluator: IMailEvaluator,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ){}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token} = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views' ,'forgot_password.hbs');

    await this.mailEvaluator.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'e-SAM Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http:localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
