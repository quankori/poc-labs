import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './ports/users.repository';
import { RegisterUserCommand } from './commands/register.command';
import { UserFactory } from '../domain/factories/users.factory';
import { User } from '../domain/users';
import { JwtService } from '@nestjs/jwt';
import { LoginUserCommand } from './commands/login.command';
import { HashingService } from './hashing.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private jwtService: JwtService,
  ) {}

  async register(registerUser: RegisterUserCommand): Promise<User> {
    const user = await this.userFactory.create(
      registerUser.email,
      registerUser.password,
      registerUser.username,
    );
    return this.userRepository.create(user);
  }

  async login(login: LoginUserCommand): Promise<string> {
    const user = await this.userRepository.validateUserByEmail(login.email);
    console.log(user)
    if (!user) throw new UnauthorizedException();
    const validatePassword = await HashingService.compareHash(
      user.password,
      login.password,
    );
    if (!validatePassword) throw new UnauthorizedException();
    const token = this.generateJwt(user);
    return token;
  }

  generateJwt(user: User): string {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
}
