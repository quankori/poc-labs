import { ObjectType, Field } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType()
export class ListProductsResponseType {
  @Field(() => [ProductType])
  products: ProductType[];
}
