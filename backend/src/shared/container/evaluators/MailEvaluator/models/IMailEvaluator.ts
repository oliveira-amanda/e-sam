import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailEvaluator {
  sendMail(data: ISendMailDTO): Promise<void>;
}