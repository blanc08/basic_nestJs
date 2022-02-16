import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
    const result = await this.usersService.find();
    if (result.length === 0) {
      throw new Error('Users not found');
    }
    return result;
  }

  @Query(() => User)
  async getUser(@Args('username') username: string) {
    const result = await this.usersService.findOne(username);

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }

  @ResolveField(() => [Cat])
  cats(@Parent() user: User) {
    return this.usersService.getCats(user.id);
  }
}
