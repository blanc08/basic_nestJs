import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { Cat } from './entities/cat.entity';

@Resolver(() => Cat)
@UseGuards(JwtAuthGuard)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat])
  async cats(): Promise<Cat[] | NotFoundException> {
    const result = await this.catsService.find();

    if (result.length === 0) {
      throw new NotFoundException('Cats not found');
    }
    return result;
  }

  @Mutation(() => Cat)
  async createCat(@Args('input') input: CreateCatInput) {
    return this.catsService.create(input);
  }

  @Query(() => Cat)
  getCat(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.findOne(id);
  }

  // Update
  @Mutation(() => Cat)
  async updateCat(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCatInput,
  ) {
    return this.catsService.update(id, input);
  }

  // Remove
  @Mutation(() => Cat)
  async removeCat(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() cat: Cat) {
    return this.catsService.getUser(cat.userId);
  }
}
