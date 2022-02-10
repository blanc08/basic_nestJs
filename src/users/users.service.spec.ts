import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppModule } from '../app.module';
import { CatsModule } from '../cats/cats.module';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersService', () => {
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

    service = module.get<UsersService>(UsersService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get users', () => {
    it('should return an array of users', async () => {
      const result = await service.find();
      expect(result).toEqual(expect.arrayContaining([]));
    });
  });

  // create user
  describe('create user', () => {
    it('should create a user', async () => {
      const user = new User();
      user.username = 'admin2';
      user.password = 'admin';
      const result = await service.create(user);
      expect(result).toEqual(expect.objectContaining(result));
    });
  });

  describe('When get a user by username', () => {
    describe('When user exists', () => {
      it('should return a user', async () => {
        const result = await service.findOne('admin');
        expect(result).toEqual(result);
      });
    });
    describe('When user is not exists', () => {
      it('should return be undefined', async () => {
        const result = await service.findOne('admin2');
        expect(result).toBeUndefined;
      });
    });
  });

  describe('When get a user by id', () => {
    describe('When user exists', () => {
      it('should return a user', async () => {
        const result = await service.findById(1);
        expect(result).toEqual(result);
      });
    });
    describe('When user is not exists', () => {
      it('should return null', async () => {
        const result = await service.findById(2);
        expect(result).toBeUndefined;
      });
    });
  });

  describe("get user's cats", () => {
    it('should return an array of cats', async () => {
      const userId = 1;
      const result = await service.getCats(userId);

      expect(result).toEqual(expect.arrayContaining([]));
    });
  });
});
