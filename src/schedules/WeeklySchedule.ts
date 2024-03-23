import { Schedule } from '../payrollDomain/Schedule.interface.ts';

export class WeeklySchedule implements Schedule {
  isFriday(date: Date): boolean {
    return date.getDay() === 5;
  }

  isPayDate(date: Date): boolean {
    return this.isFriday(date);
  }

  getPayPeriodStartDate(payDate: Date): Date {
    return new Date(payDate.getFullYear(), payDate.getMonth(), payDate.getDate() - 6);
  }
}
