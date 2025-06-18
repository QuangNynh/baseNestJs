import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu không được vượt quá 8 ký tự' })
  password: string;

  @Optional()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone_number: string;
}
