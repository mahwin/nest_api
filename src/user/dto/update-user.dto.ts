import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUSerDto {
  @ApiProperty({
    example: '01012345678',
    description: 'change phone',
    required: false,
  })
  @IsOptional()
  @IsString()
  public phone: string;

  @ApiProperty({
    example: 'Anoymous',
    description: 'change name',
    required: false,
  })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    example: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
    description: 'change avatar URL',
    required: false,
  })
  @IsOptional()
  @IsString()
  public avatar: string;
}
