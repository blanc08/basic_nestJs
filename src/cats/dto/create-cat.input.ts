import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}

// @Field(() => Int)
// userId: number;
