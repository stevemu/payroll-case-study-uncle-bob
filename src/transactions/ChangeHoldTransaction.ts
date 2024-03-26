import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeMethodTransaction } from './abstracts/ChangeMethodTransaction.ts';
import { HoldMethod } from '../domain/HoldMethod.ts';

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
