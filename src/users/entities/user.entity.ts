import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cat } from 'src/cats/entities/cat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @OneToMany(() => Cat, (cat) => cat.user)
  @Field(() => [Cat], { nullable: true })
  cats?: Cat[];
}
