import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { HoldMethod } from '../payrollImpl/HoldMethod.ts';
import { ChangeMethodTransaction } from '../abstractTransactions/ChangeMethodTransaction.ts';

export class ChangeHoldTransaction extends ChangeMethodTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private address: string,
  ) {
    super(db, empId);
  }

  getMethod() {
    return new HoldMethod(this.address);
  }
}
