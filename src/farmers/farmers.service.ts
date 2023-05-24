import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './entities/farmer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
  ) {}

  async create(createFarmerDto: CreateFarmerDto): Promise<void> {
    await this.farmerRepository.insert(createFarmerDto);
  }

  findAll(): Promise<Farmer[]> {
    return this.farmerRepository.find();
  }

  findOne(id: number): Promise<Farmer> {
    return this.farmerRepository.findOneBy({ id });
  }

  update(id: number, updateFarmerDto: UpdateFarmerDto): Promise<UpdateResult> {
    return this.farmerRepository.update({ id }, updateFarmerDto);
  }

  async remove(id: number): Promise<void> {
    await this.farmerRepository.delete(id);
  }
}
