import { Schedule } from './Schedule.interface';

export class MonthlySchedule implements Schedule {
  isLastDayOfMonth(date: Date): boolean {
    const month = date.getMonth();
    const year = date.getFullYear();
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = nextMonth === 0 ? year + 1 : year;

    const nextMonthFirstDay = new Date(nextYear, nextMonth, 1);
    const lastDay = new Date(nextMonthFirstDay.getTime() - 1);

    const d1 = date.getDate();
    const d2 = lastDay.getDate();

    return d1 === d2;
  }

  isPayDate(date: Date): boolean {
    return this.isLastDayOfMonth(date);
  }
}
