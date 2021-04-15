import IHashEvaluators from '../models/IHashEvaluators';
import { hash, compare } from 'bcryptjs';

class BCryptHashEvaluator implements IHashEvaluators {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashEvaluator;