import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
