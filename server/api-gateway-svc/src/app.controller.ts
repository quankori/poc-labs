import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Registry } from 'prom-client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private health: HealthCheckService,
    @InjectMetric('http_requests_total') private readonly httpRequestCounter: Counter<string>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('heath')
  @HealthCheck()
  check() {
    this.httpRequestCounter.inc(); 
    return this.health.check([]);
  }
}
