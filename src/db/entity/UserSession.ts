import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
