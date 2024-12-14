import { Injectable } from '@nestjs/common';
import { User } from '../users';
@Injectable()
export class UserFactory {
  create(id: string, username: string, password: string, fullname: string) {
    return new User(id, username, password, fullname);
  }
}
