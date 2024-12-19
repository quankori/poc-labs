import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { SearchModule } from '../elasticsearch/elasticsearch.module';
import { Logger } from '../logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SearchModule],
  providers: [ProductService, Logger],
  controllers: [ProductController],
})
export class ProductsModule {}
