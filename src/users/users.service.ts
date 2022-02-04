import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatsService } from '../cats/cats.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
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

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['cats'] });
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne(
      { username },
      { relations: ['cats'] },
    );
  }

  // async findOneUsername(username: string): Promise<User> {
  //   return await this.usersRepository.findOne({ username });
  // }

  async update(id: number, updateUserInput: UpdateUserInput) {
    // typeORM update method
    const user = await this.usersRepository.findOneOrFail(id);
    Object.assign(user, updateUserInput);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const response = await this.usersRepository.delete(id);
    if (response.affected === 1) {
      return true;
    }
    return false;
  }

  async findOneId(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async getCats(id: number): Promise<any> {
    return await this.catsService.getCats(id);
  }
}
