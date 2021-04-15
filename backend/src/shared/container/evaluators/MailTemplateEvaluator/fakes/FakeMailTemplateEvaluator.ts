import IMailTemplateEvaluator from '../models/IMailTemplateEvaluator';

class FakeMailTemplateEvaluator implements IMailTemplateEvaluator {
  public async parse(): Promise<string> {
    return 'mail';
  }
}

export default FakeMailTemplateEvaluator;