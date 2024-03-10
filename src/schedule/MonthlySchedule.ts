import { Schedule } from './Schedule.interface';

export class MonthlySchedule implements Schedule {
  isPayday(): boolean {
    throw new Error('Method not implemented.');
  }
}
