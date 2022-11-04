import { Test, TestingModule } from '@nestjs/testing';
import { VocasController } from './vocas.controller';

describe('VocasController', () => {
  let controller: VocasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocasController],
    }).compile();

    controller = module.get<VocasController>(VocasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
