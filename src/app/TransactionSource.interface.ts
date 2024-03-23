import { Transaction } from '../payrollDomain/Transaction.interface.ts';

export interface TransactionSource {
  getTransaction(): Promise<Transaction>;
}
