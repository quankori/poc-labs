import { Observable } from 'rxjs';
import {
  CreateProductRequest,
  ProductResponse,
  GetProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  DeleteProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  SearchProductsRequest,
} from './product.interface';

export interface ProductServiceClient {
  CreateProduct(request: CreateProductRequest): Observable<ProductResponse>;
  GetProduct(request: GetProductRequest): Observable<ProductResponse>;
  UpdateProduct(request: UpdateProductRequest): Observable<ProductResponse>;
  DeleteProduct(
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse>;
  ListProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
  SearchProducts(
    request: SearchProductsRequest,
  ): Observable<ListProductsResponse>;
}
