import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/cats/entities/cat.entity';
import { Repository } from 'typeorm';
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
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async getCats(id: number): Promise<Cat[]> {
    return await this.catsService.getCats(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    // typeORM update method
    const user = await this.usersRepository.findOneOrFail(id);
    Object.assign(user, updateUserInput);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
