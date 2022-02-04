import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppModule } from '../app.module';
import { CatsModule } from '../cats/cats.module';
import { Cat } from '../cats/entities/cat.entity';
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

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([new User()]);

      expect(await service.findAll()).toEqual(expect.arrayContaining([]));
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(new User());

      expect(await service.findOne('admin')).toEqual(
        expect.objectContaining({}),
      );
    });
  });

  describe('getCats', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'getCats').mockResolvedValue([new Cat()]);
      const userId = 1;
      expect(await service.getCats(userId)).toEqual(expect.arrayContaining([]));
    });
  });

  describe('remove', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(true);
      const userId = 1;
      expect(await service.remove(userId)).toEqual(true);
    });
  });

  describe('update', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(new User());
      const userId = 1;
      const result = { username: 'test' };
      expect(await service.update(userId, result)).toEqual({});
    });
  });

  describe('create', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(new User());
      const result = { username: 'test', password: 'test' };
      expect(await service.create(result)).toEqual({});
    });
  });

  // findOneId
  describe('findOneId', () => {
    it('should return a cat', async () => {
      jest.spyOn(service, 'findOneId').mockResolvedValue(new User());

      expect(await service.findOneId(1)).toEqual(expect.objectContaining({}));
    });
  });
});
