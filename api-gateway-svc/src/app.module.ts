import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HealthModule } from './modules/health/health.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    HealthModule,
    TerminusModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
