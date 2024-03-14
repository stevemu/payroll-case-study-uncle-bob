import { Classification } from './Classification.abstract.ts';

export class SalariedClassification extends Classification {
  constructor(public salary: number) {
    super();
  }

  calculatePay() {
    return this.salary;
  }
}
