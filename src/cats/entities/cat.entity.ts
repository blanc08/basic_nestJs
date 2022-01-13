import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../entities/user.entity';

// This entity field could be our both database schema & graphql object type
@Entity()
@ObjectType()
export class Cat {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field((type) => Int)
  age: number;

  @Column()
  @Field()
  breed: string;

  // @ManyToOne(() => User, (user) => user.cats)
  // user: User;
}
