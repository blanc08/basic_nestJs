import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/cats/entities/cat.entity';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async getCats(id: number): Promise<Cat[]> {
    return await this.catsService.getCats(id);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} book`;
  // }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
