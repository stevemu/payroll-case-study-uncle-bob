import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { DirectMethod } from '../methods/DirectMethod.ts';
import { PaymentMethod } from '../payrollDomain/PaymentMethod.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.ts';

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
