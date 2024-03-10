import { PaymentClassification } from '../../Classification.interface';
import { NullSalesReceipt, SalesReceipt } from './SalesReceipt';

export class CommissionedClassification implements PaymentClassification {
  private salesReceipts: SalesReceipt[] = [];

  constructor(
    public salary: number,
    public commissionRate: number,
  ) {}

  calculatePay(): number {
    throw new Error('Method not implemented.');
  }

  addSalesReceipt(salesReceipt: SalesReceipt): void {
    this.salesReceipts.push(salesReceipt);
  }

  getSalesReceipt(date: string): SalesReceipt | NullSalesReceipt {
    return this.salesReceipts.find((sr) => sr.date === date) || new NullSalesReceipt();
  }
}
