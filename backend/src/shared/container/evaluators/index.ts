import IStorageEvaluator from './StorageEvaluator/models/IStorageEvaluator';
import DiskStorageEvaluator from './StorageEvaluator/implementations/DiskStorageEvaluator';
import { container } from 'tsyringe';

import IMailEvaluator from './MailEvaluator/models/IMailEvaluator';
import EtherealMailEvaluator from './MailEvaluator/implementations/EtherealMailEvaluator';

import IMailTemplateEvaluator from './MailTemplateEvaluator/models/IMailTemplateEvaluator';
import HandlebarsMailTemplateEvaluator from './MailTemplateEvaluator/implementations/HandlebarsMailTemplateEvaluator';

container.registerSingleton<IStorageEvaluator>(
  'StorageEvaluator',
  DiskStorageEvaluator,
);

container.registerSingleton<IMailTemplateEvaluator>(
  'MailTemplateEvaluator',
  HandlebarsMailTemplateEvaluator,
);

container.registerInstance<IMailEvaluator>(
  'MailEvaluator',
  container.resolve(EtherealMailEvaluator),
);