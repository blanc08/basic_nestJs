import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { Cat } from './entities/cat.entity';
import { UsersModule } from 'src/users/users.module';
@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsResolver],
  exports: [CatsService],
  imports: [TypeOrmModule.forFeature([Cat]), forwardRef(() => UsersModule)],
})
export class CatsModule {}
