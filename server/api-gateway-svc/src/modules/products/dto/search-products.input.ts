import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SearchProductsInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  query: string;
}
