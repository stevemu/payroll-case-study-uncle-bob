import { Classification } from '../Classification.interface';
import { TimeCard } from './TimeCard';

export class HourlyClassification implements Classification {
  private timeCards: TimeCard[] = [];

  constructor(public hourlyRate: number) {}

  addTimeCard(timeCard: TimeCard) {
    this.timeCards.push(timeCard);
  }

  calculatePay(date: Date) {
    const timeCards = this.timeCards.filter((timeCard) => this.isInPayPeriod(date, timeCard));

    return timeCards.reduce((acc, timeCard) => {
      return acc + this.calculatePayForTimeCard(timeCard);
    }, 0);
  }

  calculatePayForTimeCard(timeCard: TimeCard) {
    const overtimeHours = Math.max(0, timeCard.hours - 8);
    const regularHours = timeCard.hours - overtimeHours;

    return regularHours * this.hourlyRate + overtimeHours * this.hourlyRate * 1.5;
  }

  isInPayPeriod(payDate: Date, timecard: TimeCard) {
    const payPeriodStart = new Date(payDate);
    payPeriodStart.setDate(payDate.getDate() - 5); // Pay period is the previous 5 days

    return timecard.date >= payPeriodStart && timecard.date <= payDate;
  }
}
