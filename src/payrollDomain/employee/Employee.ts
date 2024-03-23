import { PayCheck } from '../../PayCheck.ts';
import { Affiliation } from '../Affiliation.interface.ts';
import { PaymentClassification } from '../Classification.abstract.ts';
import { Method } from '../Method.interface.ts';
import { Schedule } from '../Schedule.interface.ts';
import { NoAffiliation } from '../../affiliation/affiliations/noAffiliation/NoAffiliation.ts';

export class Employee {
  constructor(
    public empId: number,
    public name: string,
    public address: string,
  ) {}

  public classification!: PaymentClassification;
  public schedule!: Schedule;
  public method!: Method;
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
