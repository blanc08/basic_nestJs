import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCatInput } from './dto/create-cat.input';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private catsRepository: Repository<Cat>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  // Create
  async create(cat: CreateCatInput): Promise<Cat> {
    return await this.catsRepository.save(cat);
  }

  // find All
  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  // Find One
  async findOne(id: number): Promise<Cat> {
    return await this.catsRepository.findOneOrFail(id);
  }

  async getUser(id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  async getCats(id: number): Promise<Cat[]> {
    return await this.catsRepository.find({ userId: id });
  }

  // Remove
  // async remove(id: number): Promise<void> {
  //   await this.catsRepository.delete(id);
  // }
}
