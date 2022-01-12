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
import { EntitiesModule } from './entities/entities.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, DogsModule, EntitiesModule, UsersModule],
})
export class AppModule implements NestModule {
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
