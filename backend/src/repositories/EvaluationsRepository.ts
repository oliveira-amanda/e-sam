import { EntityRepository, Repository } from 'typeorm';
import Evaluation from '../models/Evaluation';

@EntityRepository(Evaluation)
class EvaluationRepository extends Repository<Evaluation> {}

export default EvaluationRepository;
