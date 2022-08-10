import { IsString, MinLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(1)
  firstName: string;
  @IsString()
  @MinLength(1)
  lastName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
}
