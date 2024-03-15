import { TextParserTransactionSource } from './TextParserTransactionSource.ts';

const transactionSource = new TextParserTransactionSource();

while (true) {
  const transaction = await transactionSource.getTransaction();
  transaction.execute();
}
