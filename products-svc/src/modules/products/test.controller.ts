import { Controller, Get } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('test')
export class TestController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  async getHello() {
    // const createProductDto = {
    //   sku: 'SKU12345',
    //   spu: 'SPU67890',
    //   name: 'Sample Product',
    //   price: 99.99,
    // };
    await this.appService.findAll();
    // const results = await this.appService.search('SKU123');
    // console.log(results)
    return null
  }
}
