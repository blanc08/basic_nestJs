import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersService } from '../users/users.service';
import { CatsService } from '../cats/cats.service';
import { Cat } from '../cats/entities/cat.entity';
import { mockedJwtService } from '../utils/mocks/jwt.service';
import * as bcrypt from 'bcrypt';
import { mockedUser } from './mock/user.mock';
import { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let bcryptCompare: jest.Mock;
  let bcryptHash: jest.Mock;
  let findUser: jest.Mock;
  let userData: User;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;
    bcryptHash = jest.fn().mockResolvedValue('hashedPassword');
    (bcrypt.hash as jest.Mock) = bcryptHash;

    userData = { ...mockedUser };
    findUser = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOne: findUser,
      save: jest.fn().mockResolvedValue(userData),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        AuthService,
        UsersService,
        CatsService,
        { provide: JwtService, useValue: mockedJwtService },
        { provide: getRepositoryToken(User), useValue: usersRepository },
        { provide: getRepositoryToken(Cat), useValue: {} },
        AuthResolver,
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // signin
  describe('When accessing the data of authenticating user', () => {
    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(false);
      });
      it('should return null', async () => {
        const result = await service.validateUser('admin', 'hash');
        expect(result).toEqual(null);
      });
    });
    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });
      describe('and the user is found in the database', () => {
        beforeEach(() => {
          findUser.mockResolvedValue(userData);
        });
        it('should return the user data', async () => {
          const result = await service.validateUser('admin', 'hash');
          expect(result).toBe(userData);
        });
      });
      describe('and the user is not found in the database', () => {
        beforeEach(() => {
          findUser.mockResolvedValue(undefined);
        });
        it('should return null', async () => {
          const result = await service.validateUser('admin', 'hash');
          expect(result).toEqual(null);
        });
      });
    });
  });

  // signup
  describe('When user trying to signup ', () => {
    describe('and the user is found in the database', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(userData);
      });
      it('should throw an error', async () => {
        await expect(
          service.signup({
            username: 'admin',
            password: 'hash',
          }),
        ).rejects.toThrowError('User already exists');
      });
    });
    describe('and the user is not found in the database', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(undefined);
      });
      it('should return new user', async () => {
        const newUser = new User();
        newUser.username = 'admin2';
        newUser.password = 'hash';

        const result = await service.signup(newUser);
        expect(result).toBeDefined();
      });
    });
  });
});
