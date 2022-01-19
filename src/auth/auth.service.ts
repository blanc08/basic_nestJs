import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpUserInput } from './dto/signup-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUsername(username);
    console.log(user);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(signUpUserInput: SignUpUserInput) {
    const user = await this.usersService.findOneUsername(
      signUpUserInput.username,
    );

    if (user) {
      throw new Error('User already exists!');
    }

    return this.usersService.create({
      username: signUpUserInput.username,
      password: signUpUserInput.password,
    });
  }
}
