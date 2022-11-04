import { IsNotEmpty, IsString, IS_LENGTH } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '01012345678',
    description: 'phone number',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public phone: string;
}

export class TokenDto {
  @ApiProperty({
    example: '000000',
    description: '6자리 랜덤 수',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public token: string;
}
