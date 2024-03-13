import { PayCheck } from '@/src/PayCheck';
import { Classification } from '../Classification.abstract';
import { TimeCard } from './TimeCard';

export class HourlyClassification extends Classification {
  private timeCards: TimeCard[] = [];

  constructor(public hourlyRate: number) {
    super();
  }

  addTimeCard(timeCard: TimeCard) {
    this.timeCards.push(timeCard);
  }

  calculatePay(payCheck: PayCheck): number {
    const timeCards = this.timeCards.filter((timeCard) =>
      this.isInPayPeriod(timeCard.date, payCheck),
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
