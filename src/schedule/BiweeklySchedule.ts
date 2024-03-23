import { Schedule } from '../payrollDomain/Schedule.interface.ts';

export class BiweeklySchedule implements Schedule {
  isFifteenthOrLastDayOfMonth(date: Date): boolean {
    return date.getDate() === 15 || this.isLastDayOfMonth(date);
  }

  isLastDayOfMonth(date: Date): boolean {
    const month = date.getMonth();
    const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    return nextDay.getMonth() !== month;
  }

  isPayDate(payDate: Date): boolean {
    return this.isFifteenthOrLastDayOfMonth(payDate);
  }

  getPayPeriodStartDate(payDate: Date): Date {
    const startOfMonth = new Date(payDate.getFullYear(), payDate.getMonth(), 1);
    const sixteenthDay = new Date(payDate.getFullYear(), payDate.getMonth(), 16);

    if (payDate.getDate() === 15) {
      return startOfMonth;
    } else if (this.isLastDayOfMonth(payDate)) {
      return sixteenthDay;
    }
    throw new Error('Invalid pay date');
  }
}
