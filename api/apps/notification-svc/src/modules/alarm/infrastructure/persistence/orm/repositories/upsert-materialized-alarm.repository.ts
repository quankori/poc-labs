import { Injectable } from '@nestjs/common';
import { UpsertMaterializedAlarmRepository } from 'src/modules/alarm/application/ports/upsert-materialized-alarm.repository';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlarmReadModel } from 'src/modules/alarm/domain/read-models/alarm.read-model';

@Injectable()
export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedAlarmRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate({ id: alarm.id }, alarm, {
      upsert: true,
    });
  }
}
