import { PaymentClassification } from '../PaymentClassification.interface';

export class SalariedClassification implements PaymentClassification {
  constructor(private salary: number) {}

  calculatePay() {
    return this.salary;
  }

  getSalary() {
    return this.salary;
  }
}
