import { getCustomRepository } from 'typeorm';
import EvaluationsRepository from '../repositories/EvaluationsRepository';
import Evaluation from '../models/Evaluation';

interface Request {
  evaluator_id: string;
  start_date: Date;
}

class CreateEvaluationService {
  public async execute({
    start_date,
    evaluator_id,
  }: Request): Promise<Evaluation> {
    const evaluationsRepository = getCustomRepository(EvaluationsRepository);

    const evaluation = evaluationsRepository.create({
      evaluator_id,
      start_date,
    });

    await evaluationsRepository.save(evaluation);

    return evaluation;
  }
}

export default CreateEvaluationService;
