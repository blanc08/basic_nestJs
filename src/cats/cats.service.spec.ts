import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppModule } from '../app.module';
import { UsersModule } from '../users/users.module';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsService', () => {
  let service: CatsService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([Cat]),
        forwardRef(() => UsersModule),
      ],
      providers: [CatsService, CatsResolver],
      exports: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  // * Unit Test
  it('it is the Service', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return an array of cats', async () => {
      const result = await service.find();

      expect(result).toEqual(expect.arrayContaining([]));
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      // jest.spyOn(service, 'findOne').mockResolvedValue(new Cat());
      const result = await service.findOne(1);
      expect(result).toEqual(expect.objectContaining({ id: 1 }));
    });
  });

  describe('getCats', () => {
    it('should return an array of cats', async () => {
      const userId = 1;
      const result = await service.getCats(userId);

      expect(result).toEqual(expect.arrayContaining([]));
    });
  });

  describe('createCat', () => {
    it('should create a cat', async () => {
      const cat = {
        name: 'test',
        userId: 1,
        age: 1,
        breed: 'test',
        description: 'test',
      };

      const result = await service.create(cat);

      expect(result).toEqual(expect.objectContaining(cat));
    });
  });

  describe('updateCat', () => {
    it('should update a cat', async () => {
      const cat = {
        name: 'test',
        userId: 1,
        age: 1,
        breed: 'test',
        description: 'test',
      };

      const result = await service.update(1, cat);

      expect(result).toEqual(expect.objectContaining(cat));
    });
  });

  describe('deleteCat', () => {
    it('should delete a cat', async () => {
      const result = await service.remove(3);

      expect(result).toEqual(expect.objectContaining({ id: 3 }));
    });
  });

  // get user
  describe('getUser', () => {
    it('should return a user', async () => {
      const result = await service.getUser(1);
      console.log(result);

      expect(result).toEqual(expect.objectContaining({}));
    });
  });
});
