import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, TokenDto } from './dto/auth.dto';

import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: '로그인 시도',
    description: '유저가 로그인을 위해 폰번호 입력',
  })
  @ApiCreatedResponse({
    description: '넘어온 번호로 6자리 랜덤 수 입력 휴대폰 번호로 제공',
  })
  signIn(@Body() phone: LoginDto) {
    return this.authService.signIn(phone);
  }

  @Post('confirm')
  @ApiOperation({
    summary: '인증번호 확인',
    description: '유저에게 보낸 인증번호와 유저가 입력한 번호를 비교',
  })
  @ApiCreatedResponse({
    description: '인증번호가 일치한다면 JWT값을 반환합니다.',
    type: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMGIydGxiaUk2SWpFNU1UUXpNaUlzSW5OMVlpSTZJakFpTENKa1lYUmhJam9pZFhObGNpSXNJbWxoZENJNk1UWTJNelF4TmpFNU9Td2laWGh3SWpveE5qazBPVGN6TnprNWZRLl9ZUENYYkFoeVpjbUsyUlhsQWE1MUdaMGM5aXMzT21OcXI5VUQyenI5NzgiLCJpYXQiOjE2NjM0MTYxOTksImV4cCI6MTY5NDk3Mzc5OX0.BXjHx6cjvl7V8BY5zlfXkvyzhaIDkDo2ym0uLgIHxl0',
  })
  confirm(@Body() token: TokenDto, @Request() req) {
    return this.authService.confirm(token);
  }

  @Get('signout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃',
  })
  @ApiCreatedResponse({
    description: 'headers에서 JWT를 삭제함',
    type: null,
  })
  signOut() {
    return this.authService.signOut();
  }
}
