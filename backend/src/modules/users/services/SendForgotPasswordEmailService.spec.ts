import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import CreateUserService from './CreateUserService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';
import FakeMailEvaluator from '@shared/container/evaluators/MailEvaluator/fakes/FakeMailEvaluator';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailEvaluator: FakeMailEvaluator;
let fakeUserTokensRepository : FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailEvaluator = new FakeMailEvaluator();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository, 
      fakeMailEvaluator,
      fakeUserTokensRepository,
    );
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailEvaluator,'sendMail');
    await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
			email: 'joao@teste.com',
    });
    
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
		    email: 'joao@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forget password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
			email: 'joao@teste.com',
    });
    
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});