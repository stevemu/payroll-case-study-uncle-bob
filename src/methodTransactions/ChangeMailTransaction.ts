import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { MailMethod } from '../methods/MailMethod.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.ts';

export class ChangeMailTransaction extends ChangeMethodTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private address: string,
  ) {
    super(db, empId);
  }

  getMethod() {
    return new MailMethod(this.address);
  }
}
