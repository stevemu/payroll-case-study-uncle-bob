export class PayCheck {
  public grossPay: number = 0;
  public deductions: number = 0;
  public netPay: number = 0;
  public disposition: string = 'Hold.ts';

  constructor(
    public payPeriodStartDate: Date,
    public payPeriodEndDate: Date,
  ) {}
}
