import { Test, TestingModule } from '@nestjs/testing';
import { FarmersService } from './farmers.service';
import { Farmer } from './entities/farmer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';

describe('FarmersService', () => {
  let service: FarmersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmersService,
        {
          provide: getRepositoryToken(Farmer),
          useValue: createMock<Repository<Farmer>>(),
        },
      ],
    }).compile();

    service = module.get<FarmersService>(FarmersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should add a farmer to the application', async () => {
      expect((await service.findAll()).length).toBe(0);

      await service.create({ name: 'Joel', age: 27 });
      expect((await service.findAll()).length).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return empty structure after initialization', () => {
      service.findAll().then((farmers) => expect(farmers.length).toBe(0));
    });
  });

  describe('findOne', () => {
    it('should return the farmer corresponding to the id which represents the order of creation', async () => {
      let farmer: Farmer = { id: 0, name: 'Joel', age: 27 };
      await service.create(farmer);
      expect(await service.findOne(0)).toBe(farmer);
    });
  });

  describe('update', () => {
    it('should update the age of a farmer', async () => {
      expect((await service.findAll()).length).toBe(0);

      let farmer: Farmer = { id: 0, name: 'Joel', age: 27 };
      await service.create(farmer);
      expect(await service.findOne(0)).toBe(farmer);

      await service.update(0, { age: 28 });
      expect((await service.findOne(0)).age).toBe(28);
    });
  });

  describe('remove', () => {
    it('should remove farmer with given id', async () => {
      expect((await service.findAll()).length).toBe(0);

      let farmer: Farmer = { id: 0, name: 'Joel', age: 27 };
      await service.create(farmer);
      expect((await service.findAll()).length).toBe(1);

      await service.remove(0);
      expect((await service.findAll()).length).toBe(0);
    });
  });
});
