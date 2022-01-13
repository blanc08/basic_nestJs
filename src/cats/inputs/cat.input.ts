import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CatInput {
  @Field()
  name: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
