// src/product/product.controller.ts
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';

interface ProductMessage {
  sku: string;
  spu: string;
  name: string;
  price: number;
}

interface CreateProductRequest {
  product: ProductMessage;
}

interface ProductResponse {
  product: ProductMessage;
}

interface GetProductRequest {
  sku: string;
}

interface UpdateProductRequest {
  sku: string;
  product: Partial<ProductMessage>;
}

interface DeleteProductRequest {
  sku: string;
}

interface DeleteProductResponse {
  success: boolean;
}

interface ListProductsRequest {}

interface ListProductsResponse {
  products: ProductMessage[];
}

interface SearchProductsRequest {
  query: string;
}

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(data: CreateProductRequest): Promise<ProductResponse> {
    const createProductDto = data.product;
    const product = await this.productService.create(createProductDto);
    return { product };
  }

  @GrpcMethod('ProductService', 'GetProduct')
  async getProduct(data: GetProductRequest): Promise<ProductResponse> {
    const product = await this.productService.findOne(data.sku);
    return { product };
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(data: UpdateProductRequest): Promise<ProductResponse> {
    const updateProductDto: UpdateProductDto = data.product;
    const product = await this.productService.update(
      data.sku,
      updateProductDto,
    );
    return { product };
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(
    data: DeleteProductRequest,
  ): Promise<DeleteProductResponse> {
    const success = await this.productService.remove(data.sku);
    return { success };
  }

  @GrpcMethod('ProductService', 'ListProducts')
  async listProducts(data: ListProductsRequest): Promise<ListProductsResponse> {
    const products = await this.productService.findAll();
    return { products };
  }

  @GrpcMethod('ProductService', 'SearchProducts')
  async searchProducts(
    data: SearchProductsRequest,
  ): Promise<ListProductsResponse> {
    const products = await this.productService.search(data.query);
    return { products };
  }
}
