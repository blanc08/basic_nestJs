import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppModule } from '../app.module';
import { CatsModule } from '../cats/cats.module';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([User]),
        forwardRef(() => CatsModule),
      ],
      providers: [UsersService, UsersResolver],
      exports: [UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  // Unit test
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      jest.spyOn(resolver, 'users').mockResolvedValue([new User()]);

      expect(await resolver.users()).toEqual(expect.arrayContaining([]));
    });
  });

  describe('user', () => {
    it('should return a user', async () => {
      jest.spyOn(resolver, 'getUser').mockResolvedValue(new User());

      expect(await resolver.getUser('admin')).toEqual(
        expect.objectContaining({}),
      );
    });
  });

  describe('getCats', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(resolver, 'cats').mockResolvedValue([new User()]);
      expect(await resolver.cats(new User())).toEqual(
        expect.arrayContaining([]),
      );
    });
  });

  describe('removeUser', () => {
    it('should return a user', async () => {
      jest.spyOn(resolver, 'removeUser').mockResolvedValue(new User());
      expect(await resolver.removeUser('username')).toEqual(
        expect.objectContaining({}),
      );
    });
  });

  describe('updateUser', () => {
    it('should return a user', async () => {
      jest.spyOn(resolver, 'updateUser').mockResolvedValue(new User());
      expect(await resolver.updateUser(1, new User())).toEqual(
        expect.objectContaining({}),
      );
    });
  });
});
