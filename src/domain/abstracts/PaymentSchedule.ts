export interface PaymentSchedule {
  isPayDate(date: Date): boolean;
  getPayPeriodStartDate(payDate: Date): Date;
}
