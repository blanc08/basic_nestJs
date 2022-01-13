import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from 'src/entities/cat.entity';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService, CatsResolver],
})
export class CatsModule {}
