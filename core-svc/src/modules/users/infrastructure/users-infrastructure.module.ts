import { Module } from '@nestjs/common';

@Module({})
export class UsersInfrastructureModule {
  static use() {
    return {
      module: UsersInfrastructureModule,
      imports: [],
      exports: [],
    };
  }
}
