import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmersService {
  private readonly farmers: Map<number, Farmer> = new Map();
  private lastId = 0;

  create(createFarmerDto: CreateFarmerDto) {
    this.farmers.set(this.lastId, createFarmerDto);
    this.lastId += 1;
  }

  findAll() {
    return this.farmers;
  }

  findOne(id: number) {
    return this.farmers.get(id);
  }

  update(id: number, updateFarmerDto: UpdateFarmerDto) {
    let farmer = this.findOne(id);
    farmer.name = updateFarmerDto.name ?? farmer.name;
    farmer.age = updateFarmerDto.age ?? farmer.age;

    this.farmers[id] = farmer;
  }

  remove(id: number) {
    this.farmers.delete(id);
  }
}
