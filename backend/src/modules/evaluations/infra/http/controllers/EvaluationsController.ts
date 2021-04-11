import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateEvaluationService from '@modules/evaluations/services/CreateEvaluationService';

export default class EvaluationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { evaluator_id, start_date } = request.body;

    const formatStartDate = parseISO(start_date);

    const createEvaluation = container.resolve(CreateEvaluationService);

    const evaluation = await createEvaluation.execute({
      start_date: formatStartDate,
      evaluator_id,
    });

    return response.json(evaluation);
  }
}