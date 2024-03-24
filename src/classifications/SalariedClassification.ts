import { PaymentClassification } from '../payrollDomain/Classification.ts';

export class SalariedClassification extends PaymentClassification {
  constructor(public salary: number) {
    super();
  }

  calculatePay() {
    return this.salary;
  }
}
