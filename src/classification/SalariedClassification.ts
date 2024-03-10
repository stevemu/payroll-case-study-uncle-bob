import { Classification } from './Classification.interface';

export class SalariedClassification implements Classification {
  constructor(public salary: number) {}

  calculatePay() {
    return this.salary;
  }
}
