import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get('/:id')
  getUserId(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Put()
  updateUser(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.updateUser(id, data);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
