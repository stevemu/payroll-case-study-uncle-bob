import { PaymentSchedule } from './abstracts/PaymentSchedule.ts';

export class WeeklySchedule implements PaymentSchedule {
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
