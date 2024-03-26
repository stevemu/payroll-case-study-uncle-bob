import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentMethod } from '../domain/PaymentMethod.ts';
import { ChangeMethodTransaction } from './abstractTransactions/ChangeMethodTransaction.ts';
import { DirectMethod } from '../domain/impl/DirectMethod.ts';

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
