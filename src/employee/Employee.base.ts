import { PaymentClassification } from '../paymentClassification/PaymentClassification.interface';
import { PaymentMethod } from '../paymentMethod/PaymentMethod.interface';
import { PaymentSchedule } from '../paymentSchedule/PaymentSchedule.interface';

export class Employee {
  constructor(
    public empId: number,
    public name: string,
    public address: string,
  ) {}

  public paymentClassification!: PaymentClassification;
  public paymentSchedule!: PaymentSchedule;
  public paymentMethod!: PaymentMethod;
}

export class NullEmployee extends Employee {
  constructor() {
    super(-1, 'Null Employee', 'Null Address');
  }
}
