import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
// import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CatsModule, DogsModule],
})
export class AppModule {}
