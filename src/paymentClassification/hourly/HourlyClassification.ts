import { PayCheck } from '../../PayCheck.ts';
import { isBetween } from '../../utils/date.ts';
import { PaymentClassification } from '../Classification.abstract.ts';
import { TimeCard } from './TimeCard.ts';

export class HourlyClassification extends PaymentClassification {
  private timeCards: TimeCard[] = [];

  constructor(public hourlyRate: number) {
    super();
  }

  addTimeCard(timeCard: TimeCard) {
    this.timeCards.push(timeCard);
  }

  getTimeCard(date: Date): TimeCard | undefined {
    return this.timeCards.find((timeCard) => {
      return timeCard.date.getTime() === date.getTime();
    });
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

  getTimeCards() {
    return this.timeCards;
  }
}
