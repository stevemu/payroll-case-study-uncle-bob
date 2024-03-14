import { PayCheck } from './PayCheck';
import { Affiliation } from './affiliation/Affiliation.interface';
import { Classification } from './paymentClassification/Classification.abstract';
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

  getPayPeriodStartDate(payDate: Date): Date {
    return this.schedule.getPayPeriodStartDate(payDate);
  }

  payDay(payCheck: PayCheck) {
    const grossPay = this.classification.calculatePay(payCheck);
    const deductions = this.affiliation.calculateDeductions(payCheck);
    const netPay = grossPay - deductions;

    payCheck.grossPay = grossPay;
    payCheck.deductions = deductions;
    payCheck.netPay = netPay;
  }
}

export class NullEmployee extends Employee {
  constructor() {
    super(-1, 'Null Employee', 'Null Address');
  }
}
