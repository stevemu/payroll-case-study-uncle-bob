import { PaydayTransaction } from '../transactions/PaydayTransaction.ts';
import { TransactionSource } from './TransactionSource.ts';
import { Logger } from './Logger.ts';
import { AppController } from './AppController.ts';

export class TransactionApplication {
  constructor(
    private source: TransactionSource,
    private logger: Logger,
    private appController: AppController,
  ) {}

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
