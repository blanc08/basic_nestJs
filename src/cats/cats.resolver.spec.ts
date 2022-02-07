import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsResolver', () => {
  let resolver: CatsResolver;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([Cat]),
        forwardRef(() => UsersModule),
      ],
      providers: [CatsService, CatsResolver],
      exports: [CatsService],
    }).compile();

    resolver = module.get<CatsResolver>(CatsResolver);
    connection = await module.get(getConnectionToken());
  });

  afterEach(() => {
    return connection.close();
  });

  // * Unit Test
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('cats', () => {
    it('should return an array of cats', async () => {
      const result = await resolver.cats();
      // console.log(result);

      expect(result).toEqual(expect.arrayContaining([]));
    });
  });

  describe('cat', () => {
    it('should return a cat', async () => {
      const result = await resolver.getCat(6);
      // console.log(result);

      expect(result).toEqual(expect.objectContaining({}));
    });
  });
});
