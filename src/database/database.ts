import { Injectable } from '@nestjs/common';

@Injectable()
export class Database {
  createDatabaseProviders(options, entities) {
    console.log(options, entities);
  }
}
