import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  spu: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsNumber()
  price: number;
}
