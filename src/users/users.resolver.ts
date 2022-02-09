import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
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
    return this.usersService.find();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) username: string) {
    return await this.usersService.findOne(username);
  }

  @ResolveField(() => [Cat])
  cats(@Parent() user: User) {
    return this.usersService.getCats(user.id);
  }
}
