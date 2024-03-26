import { PrismaClient } from '@prisma/client';
import { config } from '../../configs/prod.config.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PrismaPayrollDatabase } from '../payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { TransactionApplication } from '../transactionApplication/TransactionApplication.ts';
import { TextParserTransactionSource } from '../transactionSource/TextParserTransactionSource.ts';
import { TransactionFactoryImpl } from '../transactions/factory/TransactionFactoryImpl.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);

const transactionFactory = new TransactionFactoryImpl(db);
const transactionSource = new TextParserTransactionSource(transactionFactory);
const app = new TransactionApplication(transactionSource);
app.run();
