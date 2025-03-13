import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { Logger } from '../logger/logger.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private elasticsearchService: ProductElasticsearchService,
    private logger: Logger,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(JSON.stringify(createProductDto));
    const existing = await this.productRepository.findOne({
      where: { sku: createProductDto.sku },
    });
    if (existing) {
      throw new BadRequestException(
        `Product with SKU ${createProductDto.sku} already exists`,
      );
    }
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    await this.elasticsearchService.indexProduct(savedProduct);
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    this.logger.log('Find all products');
    return this.productRepository.find();
  }

  async findOne(sku: string): Promise<Product> {
    this.logger.log(JSON.stringify(sku));
    const product = await this.productRepository.findOne({ where: { sku } });
    if (!product) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    return product;
  }

  async update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.log(JSON.stringify(updateProductDto));
    const product = await this.productRepository.preload({
      sku: sku,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    const updatedProduct = await this.productRepository.save(product);
    await this.elasticsearchService.updateProduct(updatedProduct);
    return updatedProduct;
  }

  async remove(sku: string): Promise<boolean> {
    this.logger.log(JSON.stringify(sku));
    const result = await this.productRepository.delete(sku);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    await this.elasticsearchService.deleteProduct(sku);
    return true;
  }

  async search(query: string): Promise<Product[]> {
    this.logger.log(JSON.stringify(query));
    return this.elasticsearchService.searchBySkuOrSpu(query);
  }
}
