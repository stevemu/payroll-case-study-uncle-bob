import { PaymentClassification } from '../Classification.interface';

export class SalariedClassification implements PaymentClassification {
  constructor(public salary: number) {}

  calculatePay() {
    return this.salary;
  }
}
