import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => User,
    user => user.images,
  )
  user: User;
}
