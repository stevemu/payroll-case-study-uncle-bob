import { PaymentClassification } from '../PaymentClassification.interface';

export class HourlyClassification implements PaymentClassification {
  constructor(public hourlyRate: number) {}

  calculatePay() {
    return 0;
  }
}
