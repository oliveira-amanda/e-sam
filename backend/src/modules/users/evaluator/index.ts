import { container } from 'tsyringe';

import IHashEvaluators from './HashEvaluator/models/IHashEvaluators';
import BCryptHashEvaluator from './HashEvaluator/implementations/BCryptHashEvaluator';

container.registerSingleton<IHashEvaluators>('HashEvaluators', BCryptHashEvaluator);
