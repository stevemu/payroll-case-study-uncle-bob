import { Application } from './Application.ts';
import { PaydayTransaction } from '../transactions/PaydayTransaction.ts';
import { TransactionSource } from '../textParserTransactionSource/TransactionSource.ts';
import { Logger } from '../logger/Logger.ts';
import { AppController } from '../appController.ts/AppController.ts';

export class TransactionApplication extends Application {
  constructor(
    private source: TransactionSource,
    private logger: Logger,
    private appController: AppController,
  ) {
    super();
  }

  public async run(): Promise<void> {
    try {
      while (true) {
        const transaction = await this.source.getTransaction();
        await transaction.execute();

        if (transaction instanceof PaydayTransaction) {
          const payChecks = transaction.getPayChecks();
          this.logger.info(payChecks.toString());
        }
      }
    } catch (error) {
      const e = error as Error;
      this.logger.error(e.message);
      this.logger.error(e.stack ?? '');
      this.appController.exit();
    }
  }
}
