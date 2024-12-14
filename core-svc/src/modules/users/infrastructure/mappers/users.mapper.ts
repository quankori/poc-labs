import { User } from '../../domain/users';
import { UserEntity } from '../entities/users.entity';

export class AlarmMapper {
  static toDomain(userEntity: UserEntity): User {
    const userModel = new User(
      userEntity.id,
      userEntity.username,
      '', // Remove password
      userEntity.fullname,
    );
    return userModel;
  }

  static toPersistence(user: User) {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.username = user.username;
    entity.password = user.password;
    entity.fullname = user.fullname;
    return entity;
  }
}
