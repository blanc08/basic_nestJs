import { Global, Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';

@Global()
@Module({
  controllers: [DogsController],
})
export class DogsModule {}
