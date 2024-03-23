import { Application } from '../application/Application.abstract.ts';
import { Transaction } from '../payrollDomain/Transaction.interface.ts';
import { PayTransaction } from '../payrollDomain/employee/transactions/PayTransaction.ts';

export abstract class PayrollApplication extends Application {
  protected abstract getTransaction(): Promise<Transaction>;

  public async run(): Promise<void> {
    let transaction: Transaction | null = null;
    while ((transaction = await this.getTransaction())) {
      await transaction.execute();

      if (transaction instanceof PayTransaction) {
        const payChecks = transaction.getPayChecks();
        console.log(payChecks);
      }
    }
  }
}
