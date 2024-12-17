import { Module, Global } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ProductElasticsearchService } from './elasticsearch.service';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [ProductElasticsearchService],
  exports: [ProductElasticsearchService],
})
export class SearchModule {}
