import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
  ) {}
  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.UserService.createUser(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
