import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ComplexityPlugin } from './ComplexityPlugin';
// import * as depthLimit from 'graphql-depth-limit';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // validationRules: [depthLimit(3)],
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
      // logging: true,
    }),
    UsersModule,
    CatsModule,
    AuthModule,
  ],
  providers: [ComplexityPlugin],
})
// export class AppModule implements NestModule {
export class AppModule {
  constructor(private connection: Connection) {}
  // async configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(logger).forRoutes('graphql');
  // }
}
