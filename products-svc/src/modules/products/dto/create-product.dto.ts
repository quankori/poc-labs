import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  spu: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}
