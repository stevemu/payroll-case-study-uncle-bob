import { Logger } from '../transactionApplication/Logger';

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(message);
  }
  error(message: string): void {
    console.error('\x1b[31m%s\x1b[0m', message);
  }
}
