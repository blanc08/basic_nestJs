import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatsService } from '../cats/cats.service';
import { Cat } from '../cats/entities/cat.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        UsersService,
        { provide: getRepositoryToken(User), useValue: { findOne } },
        { provide: getRepositoryToken(Cat), useValue: {} },
        UsersResolver,
      ],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When get a user by username', () => {
    describe('When user exists', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockResolvedValue(user);
      });
      it('should return a user', async () => {
        expect(await service.findOne('admin')).toEqual(user);
      });
    });
    describe('When user is not exists', () => {
      beforeEach(() => {
        findOne.mockResolvedValue(null);
      });
      it('should return null', async () => {
        expect(await service.findOne('admin')).toEqual(null);
      });
    });
  });
});
