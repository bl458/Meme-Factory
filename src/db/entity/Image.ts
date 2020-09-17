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
  size: number; // bytes

  @Column({ nullable: false, unique: true })
  url: string;

  @ManyToOne(
    () => User,
    user => user.images,
  )
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
