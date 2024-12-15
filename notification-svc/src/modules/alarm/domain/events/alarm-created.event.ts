import { AutowiredEvent } from 'src/modules/shared/decorators/autowired-event.decorator';
import { Alarm } from '../alarm';

@AutowiredEvent
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}
