import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { CommissionedClassification } from '../classifications/CommissionedClassification.ts';
import { SalesReceipt } from '../classifications/SalesReceipt.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';

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

    await this.db.saveEmployee(e);
  }
}
