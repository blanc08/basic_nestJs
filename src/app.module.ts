import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { DogsController } from './dogs/dogs.controller';
import { DogsModule } from './dogs/dogs.module';
import { logger } from './logger.middleware';
// import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import { CoursesModule } from './courses/courses.module';
import { BooksModule } from './books/books.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot({}),
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
    CatsModule,
    DogsModule,
    UsersModule,
    GraphQlModule,
    CoursesModule,
    BooksModule,
  ],
})
export class AppModule implements NestModule {
  // inject database
  constructor(private connection: Connection) {}
  async configure(consumer: MiddlewareConsumer) {
    // await something
    // then next
    consumer
      .apply(logger)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController, DogsController);
  }
}
