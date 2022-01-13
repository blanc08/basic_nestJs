import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [GraphQLModule.forRoot({ include: [UsersModule] })],
})
export class GraphQlModule {}
