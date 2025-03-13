export interface Product {
  sku: string;
  spu: string;
  name: string;
  price: number;
}

export interface CreateProductRequest {
  product: Product;
}

export interface GetProductRequest {
  sku: string;
}

export interface UpdateProductRequest {
  sku: string;
  product: Product;
}

export interface DeleteProductRequest {
  sku: string;
}

export interface DeleteProductResponse {
  success: boolean;
}

export interface ListProductsRequest {}

export interface ListProductsResponse {
  products: Product[];
}

export interface SearchProductsRequest {
  query: string;
}

export interface ProductResponse {
  product: Product;
}
