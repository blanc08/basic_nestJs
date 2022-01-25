import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateCatInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  age: number;

  @Field()
  description: number;

  @Field()
  breed: string;
}
