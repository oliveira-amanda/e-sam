import { EntityRepository, Repository, getRepository } from 'typeorm';
import Evaluation from '../entities/Evaluation';
import IEvaluationRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import ICreateEvaluationDTO from '@modules/evaluations/dtos/ICreateEvaluationDTO';

class EvaluationRepository implements IEvaluationRepository {
  private ormRepository: Repository<Evaluation>

  constructor() {
    this.ormRepository = getRepository(Evaluation);
  }

  public async create({ 
    evaluator_id, 
    start_date 
  }: ICreateEvaluationDTO): Promise<Evaluation> {
    const evaluation = this.ormRepository.create({ evaluator_id, start_date });

    await this.ormRepository.save(evaluation);

    return evaluation;
  }
}

export default EvaluationRepository;
