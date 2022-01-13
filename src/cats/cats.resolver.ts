import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';
import { Cat } from './entities/cat.entity';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat])
  async cats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Mutation(() => Cat)
  async createCat(@Args('input') input: CreateCatInput) {
    return this.catsService.create(input);
  }

  @Query(() => Cat)
  getCat(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() cat: Cat) {
    return this.catsService.getUser(cat.userId);
  }
}
