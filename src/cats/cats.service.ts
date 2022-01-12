import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      name: 'Cat1',
      age: 1,
      breed: 'Breed1',
    },
    {
      name: 'Cat2',
      age: 2,
      breed: 'Breed2',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats[id];
  }
}
