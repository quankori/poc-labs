import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/modules/alarm/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { CreateAlarmRepository } from 'src/modules/alarm/application/ports/create-alarm.repository';

@Injectable()
export class OrmCreatedAlarmRepository implements CreateAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
