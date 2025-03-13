import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { ProductType } from './types/product.type';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { DeleteProductResponseType } from './types/delete-product-response.type';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductType)
  async createProduct(
    @Args('product') productInput: CreateProductInput,
  ): Promise<any> {
    return this.productService
      .createProduct(productInput)
      .toPromise()
      .then((response) => response.product);
  }

  @Query(() => ProductType, { nullable: true })
  async getProduct(@Args('sku') sku: string): Promise<any> {
    return this.productService
      .getProduct(sku)
      .toPromise()
      .then((response) => response.product);
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Args('sku') sku: string,
    @Args('product') productInput: UpdateProductInput,
  ): Promise<any> {
    return this.productService
      .updateProduct(sku, productInput)
      .toPromise()
      .then((response) => response.product);
  }

  @Mutation(() => DeleteProductResponseType)
  async deleteProduct(@Args('sku') sku: string): Promise<any> {
    return this.productService.deleteProduct(sku).toPromise();
  }

  @Query(() => [ProductType])
  async listProducts(): Promise<any[]> {
    return this.productService
      .listProducts()
      .toPromise()
      .then((response) => response.products);
  }

  @Query(() => [ProductType])
  async searchProducts(@Args('query') query: string): Promise<any[]> {
    return this.productService
      .searchProducts(query)
      .toPromise()
      .then((response) => response.products);
  }
}
