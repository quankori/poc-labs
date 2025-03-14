import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { CreateAlarmRepository } from 'src/modules/alarm/application/ports/create-alarm.repository';
import { OrmCreatedAlarmRepository } from './repositories/create-alarm.repository';
import { AlarmItemEntity } from './entities/alaram-item.entity';
import { FindAlarmRepository } from 'src/modules/alarm/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/modules/alarm/application/ports/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';
import { OrmFindAlarmRepository } from './repositories/find-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreatedAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useClass: OrmFindAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
