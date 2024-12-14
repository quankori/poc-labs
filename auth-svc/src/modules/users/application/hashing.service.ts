import * as bcrypt from 'bcrypt';

export class HashingService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async compareHash(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
