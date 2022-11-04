import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class LevelUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  public userId: number;

  @IsNotEmpty()
  @IsString()
  public level: string;
}
