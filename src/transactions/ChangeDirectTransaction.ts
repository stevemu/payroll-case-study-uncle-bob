import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentMethod } from '../domain/PaymentMethod.ts';
import { ChangeMethodTransaction } from './abstractTransactions/ChangeMethodTransaction.ts';
import { PayrollFactory } from '../domain/impl/factoryImpl/PayrollFactory.ts';

export class ChangeDirectTransaction extends ChangeMethodTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    private bank: string,
    private account: string,
  ) {
    super(db, empId);
  }

  getMethod(): PaymentMethod {
    return this.payrollFactory.makeDirectMethod(this.bank, this.account);
  }
}
