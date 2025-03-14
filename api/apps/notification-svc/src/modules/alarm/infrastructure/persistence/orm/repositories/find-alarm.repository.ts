import { Injectable } from '@nestjs/common';
import { FindAlarmRepository } from 'src/modules/alarm/application/ports/find-alarm.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { Model } from 'mongoose';
import { AlarmReadModel } from 'src/modules/alarm/domain/read-models/alarm.read-model';

@Injectable()
export class OrmFindAlarmRepository implements FindAlarmRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return await this.alarmModel.find();
  }
}
