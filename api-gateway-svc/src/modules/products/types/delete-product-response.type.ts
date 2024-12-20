import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteProductResponseType {
  @Field()
  success: boolean;
}
