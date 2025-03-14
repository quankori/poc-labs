import { AutowiredEvent } from 'src/modules/shared/decorators/autowired-event.decorator';

@AutowiredEvent
export class AlarmAcknowledgeEvent {
  constructor(public readonly alarmId: string) {}
}
