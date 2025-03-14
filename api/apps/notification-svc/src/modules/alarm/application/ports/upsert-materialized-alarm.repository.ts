import { Alarm } from '../../domain/alarm';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class UpsertMaterializedAlarmRepository {
  abstract upsert(
    alaram: Pick<Alarm, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void>;
}
