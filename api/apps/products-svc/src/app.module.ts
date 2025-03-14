import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './modules/products/entities/product.entity';
import { SearchModule } from './modules/elasticsearch/elasticsearch.module';
import { Logger } from './modules/logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
