import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async login(user: Partial<User>) {
    if (!user.id) {
      return;
    }
    const payload = { username: user.user_name, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateUser(user.id, {
      ...user,
      refresh_token: hashRefreshToken,
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async refreshToken(userId: number, refreshFresh: string) {
    const user = await this.userService.getUserById(userId);
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const isRefreshTokenInvalid = bcrypt.compareSync(
      refreshFresh,
      user.refresh_token,
    );
    if (!isRefreshTokenInvalid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
  async revokeRefreshToken(userId: number): Promise<void> {
    await this.usersRepository.update(userId, { refresh_token: undefined });
  }
}
