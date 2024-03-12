import { Schedule } from './Schedule.interface';

export class BiweeklySchedule implements Schedule {
  isSecondOrFourthFriday(date: Date): boolean {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    // Check if the day is Friday and if it is either the second or fourth occurrence in the month
    return (
      dayOfWeek === 5 &&
      (Math.floor((dayOfMonth - 1) / 7) === 1 || Math.floor((dayOfMonth - 1) / 7) === 3)
    );
  }

  isPayDate(payDate: Date): boolean {
    return this.isSecondOrFourthFriday(payDate);
  }
}
