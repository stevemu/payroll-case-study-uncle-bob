import { TextParserTransactionSource } from './TextParserTransactionSource.ts';

const transactionSource = new TextParserTransactionSource();

(async function runApp() {
  while (true) {
    const transaction = await transactionSource.getTransaction();
    transaction.execute();
  }
})();
