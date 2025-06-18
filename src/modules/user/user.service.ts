import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { hashPassword } from 'src/ultils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUser() {
    return this.userRepository.find();
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    user.create_at = new Date();
    user.update_at = new Date();
    user.password = await hashPassword(data.password);
    return this.userRepository.save(user);
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async updateUser(id: number, data: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, data);
    user.update_at = new Date();
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userRepository.delete(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`Tài khoản của bạn không tồn tại`);
    }
    const status = bcrypt.compareSync(password, user.password);
    if (status) {
      return user;
    } else throw new UnauthorizedException(`Mật khẩu không chính xác`);
  }
}
