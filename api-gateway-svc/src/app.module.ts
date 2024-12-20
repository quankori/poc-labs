import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { HealthModule } from './modules/health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { ProductModule } from './modules/products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

const httpRequestCounter = makeCounterProvider({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

@Module({
  imports: [
    HealthModule,
    TerminusModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
    ProductModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, httpRequestCounter],
})
export class AppModule {}
