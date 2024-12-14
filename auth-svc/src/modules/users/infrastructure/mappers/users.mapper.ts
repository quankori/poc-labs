import { User } from '../../domain/users';
import { UserEntity } from '../entities/users.entity';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const userModel = new User(userEntity.email, userEntity.username);
    return userModel;
  }

  static toPersistence(user: User) {
    const entity = new UserEntity();
    entity.username = user.username;
    entity.password = user.password;
    entity.email = user.email;
    return entity;
  }

  static toDomainWithPassword(userEntity: UserEntity): User {
    const userModel = new User(userEntity.email, userEntity.username, userEntity.password);
    return userModel;
  }
}
