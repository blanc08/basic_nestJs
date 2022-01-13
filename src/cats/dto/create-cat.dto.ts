import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCatDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
