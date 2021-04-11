
import EvaluationsRepository from '../infra/typeorm/repositories/EvaluationsRepository';
import Evaluation from '../infra/typeorm/entities/Evaluation';
import IEvaluationRepository from '../repositories/IEvaluationsRepository';

import { inject, injectable } from 'tsyringe';

interface IRequest {
  evaluator_id: string;
  start_date: Date;
}

@injectable()
class CreateEvaluationService {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationRepository
  ){}

  public async execute({
    start_date,
    evaluator_id,
  }: IRequest): Promise<Evaluation> {

    const evaluation = await this.evaluationsRepository.create({
      evaluator_id,
      start_date,
    });

    return evaluation;
  }
}

export default CreateEvaluationService;
