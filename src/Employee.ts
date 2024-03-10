import { Affiliation } from './affiliation/Affiliation.interface';
import { PaymentClassification } from './classification/Classification.interface';
import { PaymentMethod } from './paymentMethod/PaymentMethod.interface';
import { PaymentSchedule } from './paymentSchedule/PaymentSchedule.interface';

export class Employee {
  constructor(
    public empId: number,
    public name: string,
    public address: string,
  ) {}

  public classification!: PaymentClassification;
  public paymentSchedule!: PaymentSchedule;
  public paymentMethod!: PaymentMethod;
  public affiliation!: Affiliation;
}

export class NullEmployee extends Employee {
  constructor() {
    super(-1, 'Null Employee', 'Null Address');
  }
}
