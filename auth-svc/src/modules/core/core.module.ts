import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/domain/users';
import { UserEntity } from '../users/infrastructure/entities/users.entity';

@Module({})
export class CoreModule {
  static forRoot() {
    const imports = [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        password: 'examplepassword',
        username: 'postgres',
        database: 'mydatabase',
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        entities: [UserEntity],
      }),
    ];
    return {
      module: CoreModule,
      imports,
    };
  }
}
