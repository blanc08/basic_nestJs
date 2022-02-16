import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignUpUserInput } from './dto/signup-user.input';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new Error('Username or password is incorrect');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Username or password is incorrect');
    }
    delete user.password;
    return user;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
      }),
      user,
    };
  }

  async signup(signUpUserInput: SignUpUserInput) {
    const user = await this.usersService.findOne(signUpUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    const hashedPassword = await bcrypt.hash(signUpUserInput.password, 10);

    return this.usersService.create({
      ...signUpUserInput,
      password: hashedPassword,
    });
  }
}
