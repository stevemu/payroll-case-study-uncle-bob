import { Application } from './Application.ts';
import { PaydayTransaction } from '../transactions/PaydayTransaction.ts';
import { TransactionSource } from '../transactionSource/TransactionSource.ts';

export class TransactionApplication extends Application {
  constructor(private source: TransactionSource) {
    super();
  }

  public async run(): Promise<void> {
    while (true) {
      const transaction = await this.source.getTransaction();
      await transaction.execute();

      if (transaction instanceof PaydayTransaction) {
        const payChecks = transaction.getPayChecks();
        console.log(payChecks);
      }
    }
  }
}
