import { Transaction } from '../transaction/Transaction.ts';

export interface TransactionSource {
  getTransaction(): Promise<Transaction>;
}
