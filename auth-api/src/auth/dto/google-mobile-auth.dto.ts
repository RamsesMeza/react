import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GoogleMobileAuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  idToken: string;
}
