import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateCatInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}

// @Field(() => Int)
// userId: number;
