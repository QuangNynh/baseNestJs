import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(8)
  password: string;

  @IsEmpty()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone_number: string;
}
