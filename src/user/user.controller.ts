import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUSerDto } from './dto/update-user.dto';
import { ConfirmUserDto } from './dto/confirm-user.dto';

@Controller('user')
@ApiTags('user API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '내정보 조회',
    description: '로그인한 유저가 자기 정보 조회',
  })
  @ApiCreatedResponse({
    description: 'JWT 토큰 유효성 검사 후 db에 저장된 유저 정보 리턴',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request) {
    return this.userService.getUser(req);
  }

  @ApiOperation({
    summary: '유저 정보 변경을 위해 중복 확인',
    description: '변경 하려는 name이나 phone의 중복된 값이 db에 있는지 확인',
  })
  @ApiCreatedResponse({
    description: '중복 확인 후 사용 여부 발송',
    type: UserDto,
  })
  @Post('confirm')
  confirmData(@Body() confirmData: ConfirmUserDto) {
    return this.userService.confirm(confirmData);
  }

  @ApiOperation({
    summary: '유저 정보 업데이트',
    description: '유저가 개인 정보를 수정',
  })
  @ApiCreatedResponse({
    description:
      'JWT 토큰 유효성 검사 후 유저가 보낸 정보를 토대로 user db 업데이트',
    type: UserDto,
  })
  @Post('update')
  @UseGuards(JwtAuthGuard)
  updateUser(@Req() req: Request, @Body() updateUser: UpdateUSerDto) {
    return this.userService.update(req, updateUser);
  }
}
