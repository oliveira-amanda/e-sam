import IMailEvaluator from '../models/IMailEvaluator';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailEvaluator implements IMailEvaluator {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message : ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }   
}