import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterEvaluatorFieldToEvaluatorId1616358226142
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('evaluations', 'evaluator');

    await queryRunner.addColumn(
      'evaluations',
      new TableColumn({
        name: 'evaluator_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'evaluations',
      new TableForeignKey({
        name: 'EvaluationEvaluator',
        columnNames: ['evaluator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('evaluations', 'EvaluationEvaluator');

    await queryRunner.dropColumn('evaluations', 'evaluator_id');

    await queryRunner.addColumn(
      'evaluations',
      new TableColumn({
        name: 'evaluator',
        type: 'varchar',
      }),
    );
  }
}
