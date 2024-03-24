import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { MailMethod } from '../payrollImpl/MailMethod.ts';
import { ChangeMethodTransaction } from '../abstractTransactions/ChangeMethodTransaction.ts';

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
