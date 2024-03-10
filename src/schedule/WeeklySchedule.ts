import { Schedule } from './Schedule.interface';

export class WeeklySchedule implements Schedule {
  isPayday(): boolean {
    throw new Error('Method not implemented.');
  }
}
