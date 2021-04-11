import FakeEvaluationsRepository from '../repositories/fakes/FakeEvaluationsRepository';
import CreateEvaluationService from './CreateEvaluationService';

describe('CreateEvaluation', () => {
  it('should be able to create a new evaluation', async () => {
    const fakeEvaluationsRepository = new FakeEvaluationsRepository();
    const createEvaluation = new CreateEvaluationService(
      fakeEvaluationsRepository,
    );
    const evaluation = await createEvaluation.execute({
      start_date: new Date(),
      evaluator_id: '123456789',
    });
    expect(evaluation).toHaveProperty('id');
    expect(evaluation.evaluator_id).toBe('123456789');
  });
});