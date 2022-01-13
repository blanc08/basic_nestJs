import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';
import { Repository } from 'typeorm';
import { CreateCatInput } from './dto/create-cat.input';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  // Create
  async create(cat: CreateCatInput) {
    return await this.catsRepository.save(cat);
  }

  // Create
  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  // Find One
  findOne(id: number): Cat {
    return this.catsRepository[id];
  }

  // Remove
  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
