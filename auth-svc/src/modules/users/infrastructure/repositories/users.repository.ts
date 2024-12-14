import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { UserRepository } from '../../application/ports/users.repository';
import { User } from '../../domain/users';
import { UserMapper } from '../mappers/users.mapper';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(user);
    const newEntity = await this.userRepository.save(persistenceModel);
    return UserMapper.toDomain(newEntity);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
    });
    return UserMapper.toDomain(user);
  }

  async validateUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
    });
    return UserMapper.toDomainWithPassword(user);
  }
}
