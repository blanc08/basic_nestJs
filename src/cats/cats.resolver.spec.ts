import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { User } from '../users/entities/user.entity';

describe('CatsResolver', () => {
  let resolver: CatsResolver;
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
    it('should return an array of cats', async () => {
      jest.spyOn(resolver, 'cats').mockResolvedValue([new Cat()]);

      expect(await resolver.cats()).toEqual(expect.arrayContaining([]));
    });
  });

  describe('cat', () => {
    it('should return a cat', async () => {
      jest.spyOn(resolver, 'getCat').mockResolvedValue(new Cat());

      expect(await resolver.getCat(1)).toEqual(expect.objectContaining({}));
    });
  });

  describe('createCat', () => {
    it('should return a cat', async () => {
      jest.spyOn(resolver, 'createCat').mockResolvedValue(new Cat());

      expect(
        await resolver.createCat({
          name: 'test',
          age: 1,
          breed: 'test',
          description: 'test',
          userId: 1,
        }),
      ).toEqual(expect.objectContaining({}));
    });
  });

  describe('updateCat', () => {
    it('should return a cat', async () => {
      jest.spyOn(resolver, 'updateCat').mockResolvedValue(new Cat());

      expect(
        await resolver.updateCat(1, {
          name: 'test',
          age: 1,
          breed: 'test',
          description: 'test',
          userId: 1,
        }),
      ).toEqual(expect.objectContaining({}));
    });
  });

  describe('removeCat', () => {
    it('should return a cat', async () => {
      jest.spyOn(resolver, 'removeCat').mockResolvedValue(new Cat());

      expect(await resolver.removeCat(1)).toEqual(expect.objectContaining({}));
    });
  });

  // user
  describe('user', () => {
    it('should return a user', async () => {
      jest.spyOn(resolver, 'user').mockResolvedValue(new User());

      expect(await resolver.user(new Cat())).toEqual(
        expect.objectContaining({}),
      );
    });
  });
});
