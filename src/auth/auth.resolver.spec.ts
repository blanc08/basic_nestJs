import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { mockedJwtService } from '../utils/mocks/jwt.service';
import { CatsService } from '../cats/cats.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { Cat } from '../cats/entities/cat.entity';
import { mockedUser } from './mock/user.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Context } from '@nestjs/graphql';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let bcryptCompare: jest.Mock;
  let findUser: jest.Mock;
  let userData: User;
  let service: AuthService;
  let strategy: LocalStrategy;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    userData = { ...mockedUser };
    findUser = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOne: findUser,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        AuthService,
        AuthResolver,
        UsersService,
        CatsService,
        { provide: JwtService, useValue: mockedJwtService },
        { provide: getRepositoryToken(User), useValue: usersRepository },
        { provide: getRepositoryToken(Cat), useValue: {} },
        LocalStrategy,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('When some try to sign in', () => {
    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(false);
        jest.spyOn(service, 'validateUser').mockResolvedValue(null);
        // strategy.
      });
      it('should return null', async () => {
        const result = await resolver.signin(
          {
            username: 'admin',
            password: 'hash',
          },
          {},
        );
        // console.log(result);

        expect(result).toEqual(null);
      });
    });
  });
});
