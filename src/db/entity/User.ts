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

  @Column()
  email: string;

  @Column()
  pw: string;

  @OneToMany(
    () => Image,
    image => image.user,
  )
  images: Image[];

  @CreateDateColumn()
  createdAt: Date;
}
