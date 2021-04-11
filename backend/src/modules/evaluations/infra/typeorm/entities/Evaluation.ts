import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('evaluations')
class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  evaluator_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: User;

  @Column('timestamp with time zone')
  start_date: Date;

  @CreateDateColumn('')
  created_at: Date;

  @UpdateDateColumn('')
  update_at: Date;
}

export default Evaluation;
