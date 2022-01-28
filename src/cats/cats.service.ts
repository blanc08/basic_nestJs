import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';

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
  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  // Get user
  async getUser(id: number): Promise<any> {
    return await this.usersService.findOneId(id);
  }
}
