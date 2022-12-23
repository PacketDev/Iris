import { IsEmail } from 'class-validator';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(34)
  displayName: string;

  @IsNotEmpty()
  @MaxLength(34)
  password: string;
}
