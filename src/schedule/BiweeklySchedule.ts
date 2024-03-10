import { Schedule } from './Schedule.interface';

export class BiweeklySchedule implements Schedule {
  isPayday(): boolean {
    throw new Error('Method not implemented.');
  }
}
