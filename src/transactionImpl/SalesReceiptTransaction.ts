import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';
import { CommissionedClassification } from '../payrollImpl/CommissionedClassification.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';

export class SalesReceiptTransaction extends Transaction {
  constructor(
    private db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
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
    cc.addSalesReceipt(this.payrollFactory.makeSalesReceipt(this.date, this.amount));

    await this.db.saveEmployee(e);
  }
}
