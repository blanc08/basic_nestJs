import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsResolver', () => {
  let resolver: CatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '12345678',
          database: 'learn_nestjs',
          synchronize: true,
          autoLoadEntities: true,
          // logging: true,
        }),
        TypeOrmModule.forFeature([Cat]),
        forwardRef(() => UsersModule),
      ],
      providers: [CatsService, CatsResolver],
      exports: [CatsService],
    }).compile();

    resolver = module.get<CatsResolver>(CatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
