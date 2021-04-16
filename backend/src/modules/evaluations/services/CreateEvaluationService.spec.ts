import FakeEvaluationsRepository from '../repositories/fakes/FakeEvaluationsRepository';
import CreateEvaluationService from './CreateEvaluationService';

let fakeEvaluationsRepository: FakeEvaluationsRepository;
let createEvaluation: CreateEvaluationService;

describe('CreateEvaluation', () => {
  beforeEach(() => {
    fakeEvaluationsRepository = new FakeEvaluationsRepository();
    createEvaluation = new CreateEvaluationService(
      fakeEvaluationsRepository,
    );
  })

  it('should be able to create a new evaluation', async () => {
    const evaluation = await createEvaluation.execute({
      start_date: new Date(),
      evaluator_id: '123456789',
    });
    expect(evaluation).toHaveProperty('id');
    expect(evaluation.evaluator_id).toBe('123456789');
  });
});