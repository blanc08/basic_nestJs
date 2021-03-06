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
  let service: UsersService;
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
    service = module.get<UsersService>(UsersService);
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
    describe('users found', () => {
      it('should return an array of users', async () => {
        const result = await resolver.users();
        expect(result).toEqual(expect.arrayContaining([]));
      });
    });
    describe('users not found', () => {
      it('should thow an error', async () => {
        jest.spyOn(service, 'find').mockResolvedValue([]);
        try {
          await resolver.users();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });

  describe('user', () => {
    describe('user found', () => {
      it('should return a user', async () => {
        const result = await resolver.getUser('admin');
        expect(result).toEqual(expect.objectContaining(result));
      });
    });
    describe('user not found', () => {
      it('should thow an error', async () => {
        jest.spyOn(service, 'findOne').mockResolvedValue(undefined);
        try {
          await resolver.getUser('admin');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });

  describe('getCats', () => {
    it('should return an array of cats', async () => {
      const user = new User();
      user.id = 1;

      const result = await resolver.cats(user);
      expect(result).toEqual(expect.arrayContaining([]));
    });
  });
});
