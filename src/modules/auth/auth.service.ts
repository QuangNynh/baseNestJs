import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: Partial<User>) {
    const payload = { username: user.user_name, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
