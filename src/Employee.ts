import { PayCheck } from './PayCheck';
import { Affiliation } from './affiliation/Affiliation.interface';
import { Classification } from './classification/Classification.interface';
import { Method } from './method/Method.interface';
import { Schedule } from './schedule/Schedule.interface';

export class Employee {
  constructor(
    public empId: number,
    public name: string,
    public address: string,
  ) {}

  public classification!: Classification;
  public schedule!: Schedule;
  public method!: Method;
  public affiliation!: Affiliation;

  isPayDate(payDate: Date): boolean {
    return this.schedule.isPayDate(payDate);
  }

  payDay(payDate: Date): PayCheck {
    const grossPay = this.classification.calculatePay(payDate);
    const deductions = this.affiliation.calculateDeductions(payDate);
    const netPay = grossPay - deductions;

    return new PayCheck(payDate, grossPay, deductions, netPay);
  }
}

export class NullEmployee extends Employee {
  constructor() {
    super(-1, 'Null Employee', 'Null Address');
  }
}
