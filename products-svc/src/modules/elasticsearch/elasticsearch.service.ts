// src/product/elasticsearch.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductElasticsearchService implements OnModuleInit {
  private readonly index = 'products';
  private readonly logger = new Logger(ProductElasticsearchService.name);

  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

  async onModuleInit() {
    const exists = await this.elasticsearchService.indices.exists({
      index: this.index,
    });
    if (!exists) {
      await this.elasticsearchService.indices.create({
        index: this.index,
        body: {
          mappings: {
            properties: {
              sku: { type: 'keyword' },
              spu: { type: 'keyword' },
              name: { type: 'text' },
              price: { type: 'double' },
            },
          },
        },
      });
      this.logger.log(`Created Elasticsearch index: ${this.index}`);
    }
  }

  async indexProduct(product: Product) {
    await this.elasticsearchService.index({
      index: this.index,
      id: product.sku, // Using SKU as the document ID for uniqueness
      body: {
        sku: product.sku,
        spu: product.spu,
        name: product.name,
        price: product.price,
      },
      refresh: 'wait_for',
    });
    this.logger.log(`Indexed product with SKU: ${product.sku}`);
  }

  async updateProduct(product: Product) {
    await this.elasticsearchService.update({
      index: this.index,
      id: product.sku,
      body: {
        doc: {
          spu: product.spu,
          name: product.name,
          price: product.price,
        },
      },
      refresh: 'wait_for',
    });
    this.logger.log(
      `Updated product in Elasticsearch with SKU: ${product.sku}`,
    );
  }

  async deleteProduct(sku: string) {
    await this.elasticsearchService.delete({
      index: this.index,
      id: sku,
      refresh: 'wait_for',
    });
    this.logger.log(`Deleted product from Elasticsearch with SKU: ${sku}`);
  }

  async searchBySkuOrSpu(query: string) {
    const esQuery: any = {
      bool: {
        must: [],
        filter: [],
      },
    };
    // Exact match filter for 'sku'
    if (query) {
      esQuery.bool.filter.push({ term: { sku: query } });
    }

    const results = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: esQuery,
        highlight: {
          pre_tags: ['<mark>'],
          post_tags: ['</mark>'],
          fields: {
            name: {},
          },
        },
      },
    });
    console.log(results);
    return results.hits.hits.map((hit: any) => ({
      sku: hit._source.sku,
      spu: hit._source.spu,
      name: hit._source.name,
      price: hit._source.price,
    }));
  }
}
