import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeMethodTransaction } from './abstractTransactions/ChangeMethodTransaction.ts';
import { MailMethod } from '../domain/impl/MailMethod.ts';

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
