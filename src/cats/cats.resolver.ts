import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [CreateCatDto])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => CreateCatDto)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }
}
