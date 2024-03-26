import { PayCheck } from './abstracts/PayCheck.ts';
import { Affiliation } from './abstracts/Affiliation.ts';
import { PaymentClassification } from './abstracts/Classification.ts';
import { PaymentMethod } from './abstracts/PaymentMethod.ts';
import { PaymentSchedule } from './abstracts/PaymentSchedule.ts';
import { NoAffiliation } from './NoAffiliation.ts';

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
