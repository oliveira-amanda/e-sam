import Evaluation from '../infra/typeorm/entities/Evaluation';
import ICreateEvaluationDTO from '../dtos/ICreateEvaluationDTO';

export default interface IEvaluationsRepository {
  create(data: ICreateEvaluationDTO): Promise<Evaluation>;
}