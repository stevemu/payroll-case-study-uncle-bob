import { Transaction } from './transaction/Transaction.interface';

export interface TransactionSource {
  getTransaction(): Promise<Transaction>;
}
