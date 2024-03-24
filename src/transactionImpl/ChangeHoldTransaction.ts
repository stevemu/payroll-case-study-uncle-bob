import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeMethodTransaction } from '../abstractTransactions/ChangeMethodTransaction.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class ChangeHoldTransaction extends ChangeMethodTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    private address: string,
  ) {
    super(db, empId);
  }

  getMethod() {
    return this.payrollFactory.makeHoldMethod(this.address);
  }
}