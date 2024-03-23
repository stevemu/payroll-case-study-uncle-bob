import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { MailMethod } from '../MailMethod.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract.ts';

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
