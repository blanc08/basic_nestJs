import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cat } from 'src/cats/entities/cat.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field((type) => [Cat])
  cats: Cat[];
}
