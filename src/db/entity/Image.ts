import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AdminUser } from './AdminUser';

import { User } from './User';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number; // bytes

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ nullable: false, unique: true })
  url: string;

  @Column()
  blurPlaceholder: string;

  @ManyToOne(
    () => User,
    user => user.images,
  )
  user: User;

  @ManyToOne(
    () => AdminUser,
    user => user.id,
  )
  admin: AdminUser;

  @CreateDateColumn()
  createdAt: Date;
}
