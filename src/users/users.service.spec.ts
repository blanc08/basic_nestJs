import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatsService } from '../cats/cats.service';
import { Cat } from '../cats/entities/cat.entity';
import { mockedUsers } from '../utils/mocks/user.mock';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let users: User[];

  beforeEach(async () => {
    // User repo
    users = mockedUsers;

    const usersRepository = {
      findOne: jest
        .fn()
        .mockImplementation((username) =>
          users.filter((user) => user.username === username),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        UsersService,
        { provide: getRepositoryToken(User), useValue: usersRepository },
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
      it('should return a user', async () => {
        const result = await service.findOne('admin');
        // console.log(users);
        console.log(result);

        expect(result).toEqual(user);
      });
    });
    // describe('When user is not exists', () => {
    //   beforeEach(() => {
    //     findOne.mockResolvedValue(null);
    //   });
    //   it('should return null', async () => {
    //     expect(await service.findOne('admin')).toEqual(null);
    //   });
    // });
  });
});
