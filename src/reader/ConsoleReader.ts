import nodeReadline from 'readline';
import { Reader } from '../textParserTransactionSource/Reader';

export class ConsoleReader implements Reader {
  private rl: nodeReadline.ReadLine;

  constructor() {
    this.rl = nodeReadline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async readLine(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer: string) => {
        resolve(answer);
      });
    });
  }

  close() {
    this.rl.close();
  }
}
