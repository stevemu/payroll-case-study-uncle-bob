import { Transaction } from './Transaction.ts';

export interface TransactionSource {
  getTransaction(): Promise<Transaction>;
}
