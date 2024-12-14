import { Injectable } from '@nestjs/common';
import { User } from '../users';
import { HashingService } from '../../application/hashing.service';
@Injectable()
export class UserFactory {
  async create(email: string, password: string, username: string) {
    const hashedPassword = await HashingService.hashPassword(password);
    return new User(email, username, hashedPassword);
  }
}
