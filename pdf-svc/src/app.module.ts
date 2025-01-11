import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmModule } from './modules/alarm/application/alarm.module';
import { CoreModule } from './modules/core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { AlarmsInfrastructureModule } from './modules/alarm/infrastructure/alarms-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmModule.withInfrastructure(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
