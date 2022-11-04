import { Injectable, NotFoundException, Header } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import * as twilio from 'twilio';
import { JwtService } from '@nestjs/jwt';
import generateName from '../utils/generateName';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn({ phone }: LoginDto) {
    const twilioClient = twilio(
      this.configService.get('TWILIO_SID'),
      this.configService.get('TWILIO_TOKEN'),
    );
    const payload = Math.floor(100000 + Math.random() * 900000) + '';
    const token = await this.prisma.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              phone,
            },
            create: {
              name: generateName(),
              avatar: '1',
              phone,
            },
          },
        },
      },
    });
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: `82${phone.slice(1)}`,
      body: `Your login token is ${payload}.`,
    });
    return {
      ok: true,
      payload,
    };
  }
  async confirm({ token }) {
    const foundToken = await this.prisma.token.findUnique({
      where: {
        payload: token,
      },
    });
    await this.prisma.token.deleteMany({
      where: {
        userId: foundToken.userId,
      },
    });
    if (foundToken) {
      const payload = {
        userId: foundToken.userId,
      };
      return { ok: true, accessToken: this.jwtService.sign(payload) };
    } else {
      throw new NotFoundException(`인증 번호가 일치하지 않습니다.`);
    }
  }

  @Header('authorization', '')
  async signOut() {
    return { ok: true, message: '로그아웃 성공' };
  }
}
