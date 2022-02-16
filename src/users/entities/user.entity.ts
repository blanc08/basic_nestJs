import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cat } from '../../cats/entities/cat.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @OneToMany(() => Cat, (cat) => cat.user)
  @Field(() => [Cat], { nullable: true, complexity: 1 })
  cats?: Cat[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt: Date;
  errors: any;
}
