import { PrismaClient } from '@prisma/client';
import { TextParserTransactionSource } from './TextParserTransactionSource.ts';
import { PrismaPayrollDatabase } from './database/PrismaPayrollDatabase/index.ts';
import { PayrollDatabase } from './database/index.ts';
import { config } from '../configs/prod.config.ts';
import { PayTransaction } from './transaction/PayTransaction.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);
const transactionSource = new TextParserTransactionSource(db);

while (true) {
  const transaction = await transactionSource.getTransaction();
  await transaction.execute();

  if (transaction instanceof PayTransaction) {
    const payChecks = transaction.getPayChecks();
    console.log(payChecks);
  }
}
