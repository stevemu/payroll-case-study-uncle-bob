export interface Schedule {
  isPayDate(date: Date): boolean;
  getPayPeriodStartDate(payDate: Date): Date;
}
