import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;
}
