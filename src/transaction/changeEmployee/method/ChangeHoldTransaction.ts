import { PayrollDatabase } from '../../../database/index.ts';
import { HoldMethod } from '../../../method/HoldMethod.ts';
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
