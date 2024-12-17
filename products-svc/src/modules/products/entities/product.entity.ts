import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn()
  sku: string;

  @Column()
  spu: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
