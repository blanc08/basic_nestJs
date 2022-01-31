import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// This entity field could be our both database schema & graphql object type
@Entity('cats')
@ObjectType()
export class Cat {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field()
  breed: string;

  @Column()
  @Field()
  description: string;

  @ManyToOne(() => User, (user) => user.cats)
  @Field(() => User, { complexity: 1 })
  user: User;
}
