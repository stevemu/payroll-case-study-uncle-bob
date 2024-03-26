import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentMethod } from '../domain/abstracts/PaymentMethod.ts';
import { ChangeMethodTransaction } from './abstracts/ChangeMethodTransaction.ts';
import { DirectMethod } from '../domain/DirectMethod.ts';

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
