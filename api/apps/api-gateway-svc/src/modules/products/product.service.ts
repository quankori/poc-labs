// src/product/product.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateProductRequest,
  DeleteProductRequest,
  GetProductRequest,
  ListProductsRequest,
  Product,
  ProductResponse,
  SearchProductsRequest,
  UpdateProductRequest,
  DeleteProductResponse,
  ListProductsResponse,
} from './interfaces/product.interface';
import { ProductServiceClient } from './interfaces/product-service.interface';

@Injectable()
export class ProductService implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  createProduct(product: Product): Observable<ProductResponse> {
    const request: CreateProductRequest = { product };
    return this.productService.CreateProduct(request);
  }

  getProduct(sku: string): Observable<ProductResponse> {
    const request: GetProductRequest = { sku };
    return this.productService.GetProduct(request);
  }

  updateProduct(sku: string, product: Product): Observable<ProductResponse> {
    const request: UpdateProductRequest = { sku, product };
    return this.productService.UpdateProduct(request);
  }

  deleteProduct(sku: string): Observable<DeleteProductResponse> {
    const request: DeleteProductRequest = { sku };
    return this.productService.DeleteProduct(request);
  }

  listProducts(): Observable<ListProductsResponse> {
    const request: ListProductsRequest = {};
    return this.productService.ListProducts(request);
  }

  searchProducts(query: string): Observable<ListProductsResponse> {
    const request: SearchProductsRequest = { query };
    return this.productService.SearchProducts(request);
  }
}
