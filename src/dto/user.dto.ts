import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly picture: string;
}
