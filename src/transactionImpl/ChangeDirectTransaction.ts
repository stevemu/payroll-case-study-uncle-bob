import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { DirectMethod } from '../payrollImpl/DirectMethod.ts';
import { PaymentMethod } from '../payrollDomain/PaymentMethod.ts';
import { ChangeMethodTransaction } from '../abstractTransactions/ChangeMethodTransaction.ts';

export class ChangeDirectTransaction extends ChangeMethodTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private bank: string,
    private account: string,
  ) {
    super(db, empId);
  }

  getMethod(): PaymentMethod {
    return new DirectMethod(this.bank, this.account);
  }
}
