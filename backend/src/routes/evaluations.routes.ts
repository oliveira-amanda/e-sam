import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import EvaluationsRepository from '../repositories/EvaluationsRepository';
import CreateEvaluationService from '../services/CreateEvaluationService';

import ensureAthenticated from '../middlewares/ensureAuthenticated';

const evaluationsRouter = Router();

evaluationsRouter.use(ensureAthenticated);

evaluationsRouter.get('/', async (request, response) => {
  const evaluationsRepository = getCustomRepository(EvaluationsRepository);
  const evaluations = await evaluationsRepository.find();

  return response.json(evaluations);
});

evaluationsRouter.post('/', async (request, response) => {
  try {
    const { evaluator_id, start_date } = request.body;

    const formatStartDate = parseISO(start_date);

    const createEvaluation = new CreateEvaluationService();

    const evaluation = await createEvaluation.execute({
      start_date: formatStartDate,
      evaluator_id,
    });

    return response.json(evaluation);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default evaluationsRouter;
