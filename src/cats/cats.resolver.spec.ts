import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsResolver', () => {
  let resolver: CatsResolver;
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

    resolver = module.get<CatsResolver>(CatsResolver);
    service = module.get<CatsService>(CatsService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  // * Unit Test
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('cats', () => {
    describe('cat found', () => {
      it('should return an array of cats', async () => {
        const result = await resolver.cats();
        expect(result).toEqual(expect.arrayContaining([]));
      });
    });
    describe('cat not found', () => {
      it('should thow an error', async () => {
        jest.spyOn(service, 'find').mockResolvedValue([]);
        const result = await resolver.cats();
        // expect(result).toBeInstanceOf(NotFoundException);
        // expect(result).toThrow('Cats not found');
        expect(result).toThrowError('Cats not found');
      });
    });
  });

  describe('when find a cat', () => {
    it('should return a cat', async () => {
      const result = await resolver.getCat(2);
      // console.log(result);

      expect(result).toEqual(expect.objectContaining({ id: 2 }));
    });
  });

  describe('createCat', () => {
    it('should return a cat', async () => {
      const data = {
        name: '2th Astrid',
        userId: 1,
        age: 2,
        description: 'Astrid is a cat',
        breed: 'Persian',
      };
      const result = await resolver.createCat(data);

      expect(result).toEqual(expect.objectContaining(data));
    });
  });

  describe('updateCat', () => {
    it('should return a cat', async () => {
      const data = {
        name: '2nd Astrid',
        userId: 1,
        age: 2,
        description: 'Astrid is a cat',
        breed: 'Persian',
      };
      const result = await resolver.updateCat(2, data);

      expect(result).toEqual(expect.objectContaining(data));
    });
  });

  describe('deleteCat', () => {
    it('should return a cat', async () => {
      const result = await resolver.removeCat(26);

      expect(result).toEqual(expect.objectContaining({ id: 26 }));
    });
  });
});
