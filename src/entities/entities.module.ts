import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
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
    }),
  ],
})
export class EntitiesModule {
  // inject database
  constructor(private connection: Connection) {}
}
