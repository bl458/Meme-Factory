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

  @Column({ nullable: false })
  url: string;

  @ManyToOne(
    () => User,
    user => user.images,
  )
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
