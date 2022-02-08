import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { SigninUserInput } from './dto/signin-user.input';
import { SignUpUserInput } from './dto/signup-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  signin(
    @Args('signinUserInput') signInUserInput: SigninUserInput,
    @Context() context: any,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signup(signUpUserInput);
  }
}
