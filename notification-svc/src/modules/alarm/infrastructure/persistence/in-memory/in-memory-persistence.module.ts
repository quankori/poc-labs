import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from 'src/modules/alarm/application/ports/create-alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { FindAlarmRepository } from 'src/modules/alarm/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/modules/alarm/application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryAlarmPersistenceModule {}
