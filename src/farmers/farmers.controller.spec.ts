import { Test, TestingModule } from '@nestjs/testing';
import { FarmersController } from './farmers.controller';
import { FarmersService } from './farmers.service';
import { Repository } from 'typeorm';
import { Farmer } from './entities/farmer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';

describe('FarmersController', () => {
  let controller: FarmersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmersController],
      providers: [
        FarmersService,
        {
          provide: getRepositoryToken(Farmer),
          useValue: createMock<Repository<Farmer>>(),
        },
      ],
    }).compile();

    controller = module.get<FarmersController>(FarmersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
