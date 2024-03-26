import { Transaction } from '../transactions/Transaction.ts';

export interface TransactionSource {
  getTransaction(): Promise<Transaction>;
}
