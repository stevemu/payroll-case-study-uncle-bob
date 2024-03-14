import { PayCheck } from '@/src/PayCheck.ts';
import { Classification } from '../Classification.abstract.ts';
import { TimeCard } from './TimeCard.ts';
import { isBetween } from '@/src/utils/date.ts';

export class HourlyClassification extends Classification {
  private timeCards: TimeCard[] = [];

  constructor(public hourlyRate: number) {
    super();
  }

  addTimeCard(timeCard: TimeCard) {
    this.timeCards.push(timeCard);
  }

  getTimeCard(date: Date): TimeCard | undefined {
    return this.timeCards.find((timeCard) => timeCard.date === date);
  }

  calculatePay(payCheck: PayCheck): number {
    const timeCards = this.timeCards.filter((timeCard) =>
      isBetween(timeCard.date, payCheck.payPeriodStartDate, payCheck.payPeriodEndDate),
    );

    return timeCards.reduce((acc, timeCard) => {
      return acc + this.calculatePayForTimeCard(timeCard);
    }, 0);
  }

  calculatePayForTimeCard(timeCard: TimeCard) {
    const overtimeHours = Math.max(0, timeCard.hours - 8);
    const regularHours = timeCard.hours - overtimeHours;

    return regularHours * this.hourlyRate + overtimeHours * this.hourlyRate * 1.5;
  }
}
