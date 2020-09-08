import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
}
