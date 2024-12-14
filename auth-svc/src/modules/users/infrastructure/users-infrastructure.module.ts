import { Module } from '@nestjs/common';
import { OrmUserRepository } from './repositories/users.repository';
import { UserRepository } from '../application/ports/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: OrmUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersInfrastructureModule {}
