import { Schedule } from './Schedule.interface';

export class WeeklySchedule implements Schedule {
  isFriday(date: Date): boolean {
    return date.getDay() === 5;
  }

  isPayDate(date: Date): boolean {
    return this.isFriday(date);
  }
}
