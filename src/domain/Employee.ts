import { PayCheck } from './PayCheck.ts';
import { Affiliation } from './Affiliation.ts';
import { PaymentClassification } from './Classification.ts';
import { PaymentMethod } from './PaymentMethod.ts';
import { PaymentSchedule } from './PaymentSchedule.ts';
import { NoAffiliation } from './impl/NoAffiliation.ts';

export class Employee {
  constructor(
    public empId: number,
    public name: string,
    public address: string,
  ) {}

  public classification!: PaymentClassification;
  public schedule!: PaymentSchedule;
  public method!: PaymentMethod;
  public affiliation: Affiliation = new NoAffiliation();

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

    this.method.pay(payCheck);
  }
}
