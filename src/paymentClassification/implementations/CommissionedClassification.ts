import { PaymentClassification } from '../PaymentClassification.interface';

export class CommissionedClassification implements PaymentClassification {
  constructor(
    public salary: number,
    public commissionRate: number,
  ) {}

  calculatePay(): number {
    throw new Error('Method not implemented.');
  }
}
