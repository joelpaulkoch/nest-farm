import { Test, TestingModule } from '@nestjs/testing';
import { FarmersService } from './farmers.service';
import { Farmer } from './entities/farmer.entity';

describe('FarmersService', () => {
  let service: FarmersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmersService],
    }).compile();

    service = module.get<FarmersService>(FarmersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should add a farmer to the application', () => {
      expect(service.findAll().size).toBe(0);

      service.create({ name: 'Joel', age: 27 });
      expect(service.findAll().size).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return empty structure after initialization', () => {
      expect(service.findAll().size).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return the farmer corresponding to the id which represents the order of creation', () => {
      let farmer: Farmer = { name: 'Joel', age: 27 };
      service.create(farmer);
      expect(service.findOne(0)).toBe(farmer);
    });
  });

  describe('update', () => {
    it('should update the age of a farmer', () => {
      expect(service.findAll().size).toBe(0);

      let farmer: Farmer = { name: 'Joel', age: 27 };
      service.create(farmer);
      expect(service.findOne(0)).toBe(farmer);

      service.update(0, { age: 28 });
      expect(service.findOne(0).age).toBe(28);
    });
  });

  describe('remove', () => {
    it('should remove farmer with given id', () => {
      expect(service.findAll().size).toBe(0);

      let farmer: Farmer = { name: 'Joel', age: 27 };
      service.create(farmer);
      expect(service.findAll().size).toBe(1);

      service.remove(0);
      expect(service.findAll().size).toBe(0);
    });
  });
});
