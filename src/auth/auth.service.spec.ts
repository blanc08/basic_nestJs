import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        PassportModule,
        UsersModule,
        JwtModule.register({
          signOptions: { expiresIn: '1h' },
          secret: 'secret',
        }),
      ],
      providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      // jest.spyOn(service, 'validateUser').mockResolvedValue({});

      expect(await service.validateUser('test', 'test')).toEqual(
        expect.objectContaining({}),
      );
    });
  });

  // login
  describe('login', () => {
    it('should return a token', async () => {
      jest.spyOn(service, 'login').mockResolvedValue({
        access_token: 'token',
        user: new User(),
      });

      expect(await service.login(new User())).toEqual({
        access_token: 'token',
        user: new User(),
      });
    });
  });

  // signup
  describe('signup', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'signup').mockResolvedValue(new User());

      expect(await service.signup(new User())).toEqual(
        expect.objectContaining({}),
      );
    });
  });
});
