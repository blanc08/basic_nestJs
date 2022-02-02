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
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Cat } from '../cats/entities/cat.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) username: string) {
    return await this.usersService.findOne(username);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) username: string) {
    const user = await this.usersService.findOne(username);
    await this.usersService.remove(user.id);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.usersService.update(id, input);
  }

  @ResolveField(() => [Cat])
  cats(@Parent() user: User) {
    return this.usersService.getCats(user.id);
  }
}
