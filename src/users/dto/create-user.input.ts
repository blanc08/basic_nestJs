import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  isActive: boolean;
}
