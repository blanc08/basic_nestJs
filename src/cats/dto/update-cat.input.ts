import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCatInput } from './create-cat.input';

@InputType()
export class UpdateCatInput extends PartialType(CreateCatInput) {}
