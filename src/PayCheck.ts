export class PayCheck {
  constructor(
    public payDate: Date,
    public grossPay: number,
    public deductions: number,
    public netPay: number,
    public disposition: string = 'Hold',
  ) {}
}
