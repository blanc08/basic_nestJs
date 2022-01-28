import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { Cat } from './entities/cat.entity';

@Resolver(() => Cat)
@UseGuards(JwtAuthGuard)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat], { complexity: 1 })
  async cats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Mutation(() => Cat, { complexity: 1 })
  async createCat(@Args('input') input: CreateCatInput) {
    return this.catsService.create(input);
  }

  @Query(() => Cat, { complexity: 1 })
  getCat(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.findOne(id);
  }

  // Update
  @Mutation(() => Cat, { complexity: 1 })
  async updateCat(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCatInput,
  ) {
    return this.catsService.update(id, input);
  }

  // Remove
  @Mutation(() => Cat, { complexity: 1 })
  async removeCat(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.remove(id);
  }

  @ResolveField(() => User, { complexity: 1 })
  user(@Parent() cat: Cat) {
    return this.catsService.getUser(cat.userId);
  }
}
