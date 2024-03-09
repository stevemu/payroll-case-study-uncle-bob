import { PaymentClassification } from '../../PaymentClassification.interface';
import { NullTimeCard, TimeCard } from './TimeCard';

export class HourlyClassification implements PaymentClassification {
  private timeCards: TimeCard[] = [];

  constructor(public hourlyRate: number) {}

  calculatePay() {
    return 0;
  }

  addTimeCard(timeCard: TimeCard) {
    this.timeCards.push(timeCard);
  }

  getTimeCard(date: string) {
    return this.timeCards.find((timeCard) => timeCard.date === date) || new NullTimeCard();
  }
}
