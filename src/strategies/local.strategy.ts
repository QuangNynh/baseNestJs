import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email', passwordField: 'password' }); // Chỉ định field username trong body
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }
    return user;
  }
}
