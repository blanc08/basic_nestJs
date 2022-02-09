import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatsService } from '../cats/cats.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}

  async create(user: CreateUserInput): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async find(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['cats'] });
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne(
      { username },
      { relations: ['cats'] },
    );
  }

  async findOneId(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async getCats(id: number): Promise<any> {
    return await this.catsService.getCats(id);
  }
}
