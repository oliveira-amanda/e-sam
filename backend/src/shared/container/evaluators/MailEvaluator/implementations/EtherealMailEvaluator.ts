import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailEvaluator from '../models/IMailEvaluator';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateEvaluator from '@shared/container/evaluators/MailTemplateEvaluator/models/IMailTemplateEvaluator';

@injectable()
export default class EtherealMailEvaluator implements IMailEvaluator {
  private client: Transporter;

  constructor(
    @inject('MailTemplateEvaluator')
    private mailTemplateEvaluator: IMailTemplateEvaluator,
  ) {
    nodemailer.createTestAccount().then( account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({ to, from, subject, templateData } : ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'e-SAM Eletronic Self Assessment Manikin',
        address: from?.email || '',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateEvaluator.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }   
}