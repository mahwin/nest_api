import { Test, TestingModule } from '@nestjs/testing';
import { VocasService } from './vocas.service';

describe('VocasService', () => {
  let service: VocasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocasService],
    }).compile();

    service = module.get<VocasService>(VocasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
