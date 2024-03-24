import { Application } from '../application/Application.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';
import { PaydayTransaction } from '../generalTransactions/PaydayTransaction.ts';

export abstract class PayrollApplication extends Application {
  protected abstract getTransaction(): Promise<Transaction>;

  public async run(): Promise<void> {
    let transaction: Transaction | null = null;
    while ((transaction = await this.getTransaction())) {
      await transaction.execute();

      if (transaction instanceof PaydayTransaction) {
        const payChecks = transaction.getPayChecks();
        console.log(payChecks);
      }
    }
  }
}
