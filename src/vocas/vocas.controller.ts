import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VocasService } from './vocas.service';
import { LevelUpdateDto } from './dto/vocas-level-update.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { Request } from 'express';

@Controller('vocas')
export class VocasController {
  constructor(private readonly vocasService: VocasService) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  getUserVocas(@Req() req: Request) {
    return this.vocasService.getUserVocas(req);
  }

  @Get('/all')
  getAllVocas() {
    return this.vocasService.getAll();
  }

  @Post('/:category')
  levelUpdate(
    @Param('category') category: string,
    @Body() updateData: LevelUpdateDto,
  ) {
    return this.vocasService.levelUpdate(category, updateData);
  }
}
