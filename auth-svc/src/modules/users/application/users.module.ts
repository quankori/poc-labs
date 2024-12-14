import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserService } from './users.service';
import { UserFactory } from '../domain/factories/users.factory';
import { AuthController } from '../presenters/http/users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [UserService, UserFactory, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variables in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class UserModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: UserModule,
      imports: [infrastructureModule],
    };
  }
}
