import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmUserDto {
  @ApiProperty({
    example: 'new name',
    description: '변경하고자 하는 유저정보',
    required: false,
  })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    example: '01087654321',
    description: '변경하고자 하는 폰 번호',
    required: false,
  })
  @IsOptional()
  @IsString()
  public phone: string;
}
