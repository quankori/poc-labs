import { User } from '../../domain/users';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract validateUserByEmail(id: string): Promise<User>;
}
