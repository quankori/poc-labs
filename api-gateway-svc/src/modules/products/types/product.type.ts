import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field()
  sku: string;

  @Field()
  spu: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
