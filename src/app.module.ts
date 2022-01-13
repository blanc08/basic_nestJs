import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'learn_nestjs',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    CatsModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('cats', 'users');
  }
}
