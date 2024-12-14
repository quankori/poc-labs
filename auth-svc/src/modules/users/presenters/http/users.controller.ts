import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserCommand } from '../../application/commands/register.command';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from '../../domain/users';
import { GetUser } from 'src/common/decorators/user.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserCommand } from '../../application/commands/login.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async create(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(
      new RegisterUserCommand(
        registerUserDto.email,
        registerUserDto.password,
        registerUserDto.username,
      ),
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a  user' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(
      new LoginUserCommand(loginUserDto.email, loginUserDto.password),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@GetUser() user: User): Partial<User> {
    return { email: user.email, username: user.username };
  }
}
