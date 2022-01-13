import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';
import { Repository } from 'typeorm';
import { CatInput } from './inputs/cat.input';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  async create(cat: CatInput) {
    console.log(cat);
    return await this.catsRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Cat {
    return this.catsRepository[id];
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
