import { Transaction } from './transaction/Transaction.interface.ts';

export interface TransactionSource {
  getTransaction(): Promise<Transaction>;
}
