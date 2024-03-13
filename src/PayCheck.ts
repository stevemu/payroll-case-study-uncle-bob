export class PayCheck {
  public grossPay: number = 0;
  public deductions: number = 0;
  public netPay: number = 0;
  public disposition: string = 'Hold';

  constructor(
    public payPeriodStartDate: Date,
    public payDate: Date,
  ) {}
}
