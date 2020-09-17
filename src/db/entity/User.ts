import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { Image } from './Image';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  pw: string;

  @OneToMany(
    () => Image,
    image => image.user,
  )
  images: Image[];

  @CreateDateColumn()
  createdAt: Date;
}
