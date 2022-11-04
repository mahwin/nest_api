import { Injectable } from '@nestjs/common';
import { VocaDto } from './dto/vocas-voca.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import camelCaser from 'src/utils/camelCaser';
import uniqueArr from 'src/utils/uniqueArr';
import { UserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VocasService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  private voca: VocaDto[] = [];

  async getAll() {
    const data = await this.prisma.seperatedVocabulary.findUnique({
      where: {
        id: 2,
      },
    });
    return { ok: true, data: data.data };
  }

  async levelUpdate(category: string, { userId, level }) {
    const isExisted = await this.prisma.userAddVocabulary.findUnique({
      where: { userId },
    });
    if (isExisted) {
      category = camelCaser(category);
      const oldLevel = isExisted[category] || '[]';
      const data = await this.prisma.userAddVocabulary.update({
        where: {
          userId,
        },
        data: {
          [category]: uniqueArr(oldLevel, level),
        },
      });
      return { ok: true, message: '업데이트 성공' };
    } else {
      await this.prisma.userAddVocabulary.create({
        data: {
          [category]: level,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    return { ok: true, message: '저장 성공' };
  }
  async getUserVocas(req) {
    const userId = await this.parsePayload(req);
    const userVocas = await this.prisma.userAddVocabulary.findUnique({
      where: {
        userId: +userId,
      },
    });

    return { ok: true, data: userVocas };
  }

  async parsePayload(req): Promise<UserDto> {
    const signedJwtAccessToken = req.headers.authorization.split(' ')[1];
    const { userId }: any = this.jwtService.decode(signedJwtAccessToken);
    return userId;
  }
}
