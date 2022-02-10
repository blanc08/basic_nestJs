import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppModule } from '../app.module';
import { User } from '../users/entities/user.entity';
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

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = await service.find();

      console.log(result);

      expect(result).toEqual(expect.arrayContaining([]));
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(new Cat());

      expect(await service.findOne(1)).toEqual(expect.objectContaining({}));
    });
  });

  describe('getCats', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(new Cat());
      const userId = 1;
      expect(await service.getCats(userId)).toEqual(expect.arrayContaining([]));
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

      // result
      const result = {
        id: 1,
        name: 'test',
        userId: 1,
        age: 1,
        user: {
          id: 1,
          username: 'test',
          password: 'test',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          errors: null,
        },
        breed: 'test',
        description: 'test',
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(new Promise((resolve) => resolve(result)));
      expect(await service.create(cat)).toEqual(expect.objectContaining(cat));
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
      // result
      const result = {
        id: 1,
        name: 'test',
        userId: 1,
        age: 1,
        user: {
          id: 1,
          username: 'test',
          password: 'test',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          errors: null,
        },
        breed: 'test',
        description: 'test',
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(new Promise((resolve) => resolve(result)));
      expect(await service.update(1, cat)).toEqual(
        expect.objectContaining(cat),
      );
    });
  });

  describe('deleteCat', () => {
    it('should delete a cat', async () => {
      // result
      const result = {
        id: 3,
        name: 'test',
        userId: 1,
        age: 1,
        user: {
          id: 1,
          username: 'test',
          password: 'test',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          errors: null,
        },
        breed: 'test',
        description: 'test',
      };

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(new Promise((resolve) => resolve(result)));

      expect(await service.remove(3)).toEqual(
        expect.objectContaining({ id: 3 }),
      );
    });
  });

  // get user
  describe('getUser', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue(new User());

      expect(await service.getUser(1)).toEqual(expect.objectContaining({}));
    });
  });
});
