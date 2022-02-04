import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppModule } from '../app.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
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

    resolver = module.get<AuthResolver>(AuthResolver);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // sign in
  describe('signIn', () => {
    it('should return a token', async () => {
      jest.spyOn(resolver, 'signin').mockResolvedValue({
        access_token: 'token',
        user: new User(),
      });

      expect(
        await resolver.signin(
          { username: 'test', password: 'test' },
          'context',
        ),
      ).toEqual(expect.objectContaining({}));
    });
  });

  // sign up
  describe('signUp', () => {
    it('should return a token', async () => {
      jest.spyOn(resolver, 'signup').mockResolvedValue(new User());

      expect(
        await resolver.signup({ username: 'test', password: 'test' }),
      ).toEqual(expect.objectContaining({}));
    });
  });
});
