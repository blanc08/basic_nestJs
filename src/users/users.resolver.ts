import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cat } from 'src/cats/entities/cat.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { complexity: 1 })
  @UseGuards(JwtAuthGuard)
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { complexity: 1 })
  async getUser(@Args('id', { type: () => Int }) username: string) {
    return await this.usersService.findOne(username);
  }

  @Mutation(() => User, { complexity: 1 })
  async removeUser(@Args('id', { type: () => Int }) username: string) {
    const user = await this.usersService.findOne(username);
    await this.usersService.remove(user.id);
    return user;
  }

  @Mutation(() => User, { complexity: 1 })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.usersService.update(id, input);
  }

  @ResolveField(() => [Cat], { complexity: 1 })
  cats(@Parent() user: User) {
    return this.usersService.getCats(user.id);
  }
}
