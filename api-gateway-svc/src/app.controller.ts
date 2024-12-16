import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private health: HealthCheckService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/heath')
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
