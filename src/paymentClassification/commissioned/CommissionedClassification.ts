import { PayCheck } from '@/src/PayCheck';
import { Classification } from '../Classification.abstract';
import { SalesReceipt } from './SalesReceipt';

export class CommissionedClassification extends Classification {
  private salesReceipts: SalesReceipt[] = [];

  constructor(
    public salary: number,
    public commissionRate: number,
  ) {
    super();
  }

  calculatePay(payCheck: PayCheck): number {
    const halfOfSalary = this.salary / 2;
    const commission = this.calculateCommissions(payCheck.payDate);
    return halfOfSalary + commission;
  }

  calculateCommissions(payDate: Date): number {
    let commission = 0;

    for (const salesReceipt of this.salesReceipts) {
      if (this.isSalesReceiptInPayPeriod(salesReceipt, payDate)) {
        commission += salesReceipt.amount * this.commissionRate;
      }
    }

    return commission;
  }

  isSalesReceiptInPayPeriod(salesReceipt: SalesReceipt, payDate: Date): boolean {
    const payPeriodStartDate = new Date(payDate.getTime() - 14 * 24 * 60 * 60 * 1000); // Subtract 2 weeks in milliseconds

    return salesReceipt.date >= payPeriodStartDate && salesReceipt.date <= payDate;
  }

  addSalesReceipt(salesReceipt: SalesReceipt): void {
    this.salesReceipts.push(salesReceipt);
  }

  getSalesReceipt(date: Date): SalesReceipt | null {
    return this.salesReceipts.find((sr) => sr.date === date) || null;
  }
}
