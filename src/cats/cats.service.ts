import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { Cat } from './entities/cat.entity';

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
    return await this.catsRepository.find({ relations: ['user'] });
  }

  // Find One
  async findOne(id: number): Promise<Cat> {
    return await this.catsRepository.findOneOrFail(id);
  }

  async getCats(id: number): Promise<Cat[]> {
    return await this.catsRepository.find({ userId: id });
  }

  async update(id: number, updateCatInput: UpdateCatInput) {
    // typeORM update method
    const cat = await this.catsRepository.findOneOrFail(id);
    Object.assign(cat, updateCatInput);
    return await this.catsRepository.save(cat);
  }

  // Remove
  async remove(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOneOrFail(id);
    if (cat) {
      if (await this.catsRepository.delete(id)) {
        return cat;
      }
    }
  }

  // Get user
  async getUser(id: number): Promise<User> {
    return await this.usersService.findOneId(id);
  }
}
