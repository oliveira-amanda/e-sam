import { v4 as uuid } from 'uuid';
import Evaluation from '../../infra/typeorm/entities/Evaluation';
import IEvaluationRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import ICreateEvaluationDTO from '@modules/evaluations/dtos/ICreateEvaluationDTO';

class EvaluationRepository implements IEvaluationRepository {
  private evaluations: Evaluation[] = [];

  public async create({ 
    evaluator_id, 
    start_date 
  }: ICreateEvaluationDTO): Promise<Evaluation> {
    const evaluation = new Evaluation();

    Object.assign(evaluation, {id: uuid(), start_date, evaluator_id});

    this.evaluations.push(evaluation);

    return evaluation;
  }
}

export default EvaluationRepository;
