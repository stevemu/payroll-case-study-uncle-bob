import { PayCheck } from '../PayCheck';

export abstract class Classification {
  abstract calculatePay(payCheck: PayCheck): number;

  isInPayPeriod(date: Date, payCheck: PayCheck) {
    const payPeriodStartDate = payCheck.payPeriodStartDate;
    const payPeriodEndDate = payCheck.payPeriodEndDate;
    return date >= payPeriodStartDate && date <= payPeriodEndDate;
  }
}
