import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VocaDto {
  @IsNotEmpty()
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public category: string;

  @IsNotEmpty()
  @IsNumber()
  public level: string;

  @IsNotEmpty()
  @IsString()
  public word: string;

  @IsNotEmpty()
  @IsString()
  public mean: string;

  @IsNotEmpty()
  @IsString()
  public frequency: string;

  @IsDate()
  public createdAt: Date;

  @IsDate()
  public updatedAt: Date;
}
