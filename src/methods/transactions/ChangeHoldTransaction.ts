import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { HoldMethod } from '../methods/HoldMethod.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract.ts';

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
