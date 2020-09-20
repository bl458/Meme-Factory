import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUser } from './AdminUser';

@Entity()
export class AdminUserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToOne(() => AdminUser)
  @JoinColumn()
  user: AdminUser;

  @CreateDateColumn()
  createdAt: Date;
}
