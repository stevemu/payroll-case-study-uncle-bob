import { PayrollDatabase } from '../database/index.ts';
import { CommissionedClassification } from '../paymentClassification/commissioned/CommissionedClassification.ts';
import { SalesReceipt } from '../paymentClassification/commissioned/SalesReceipt.ts';
import { Transaction } from './Transaction.interface.ts';

export class SalesReceiptTransaction extends Transaction {
  constructor(
    private db: PayrollDatabase,
    private empId: number,
    private date: Date,
    private amount: number,
  ) {
    super();
  }

  async execute(): Promise<void> {
    const e = await this.db.getEmployee(this.empId);

    if (!e) {
      throw new Error('No such employee');
    }

    const pc = e.classification;
    if (!(pc instanceof CommissionedClassification)) {
      throw new Error('Tried to add sales receipt to non-commissioned employee');
    }

    const cc = pc as CommissionedClassification;
    cc.addSalesReceipt(new SalesReceipt(this.date, this.amount));
  }
}
