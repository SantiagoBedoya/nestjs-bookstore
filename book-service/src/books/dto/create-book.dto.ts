import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  ISBN: string;
  @IsString()
  @MinLength(1)
  title: string;
  @IsString()
  @MinLength(1)
  subject: string;
  @IsString()
  @MinLength(1)
  publisher: string;
  @IsString()
  @MinLength(1)
  language: string;
  @IsPositive()
  @IsNumber()
  numberOfPages: number;
  @IsPositive()
  @IsNumber()
  stock: number;
}
