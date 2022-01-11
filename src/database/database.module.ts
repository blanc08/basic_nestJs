// import { DynamicModule, Module } from '@nestjs/common';
// import { Connection } from './connection';
// import { Database } from './database';

// @Module({
//   providers: [Connection],
// })
// export class DatabaseModule {
//   static forRoot(entities = [], options?): DynamicModule {
//     const providers = Database.createDatabaseProviders(options, entities);
//     return {
//       module: DatabaseModule,
//       providers: providers,
//       exports: providers,
//     };
//   }
// }
