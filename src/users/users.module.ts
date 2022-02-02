import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => CatsModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
