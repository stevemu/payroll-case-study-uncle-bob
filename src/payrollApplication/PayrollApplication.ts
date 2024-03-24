import { PrismaClient } from '@prisma/client';
import { config } from '../../configs/prod.config.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PrismaPayrollDatabase } from '../payrollDatabaseImpl/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { TransactionApplication } from '../transactionApplication/TransactionApplication.ts';
import { TextParserTransactionSource } from '../textParserTransactionSource/TextParserTransactionSource.ts';
import { TransactionFactoryImpl } from '../transactionImpl/TransactionFactoryImpl.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);

const factory = new TransactionFactoryImpl(db);
const source = new TextParserTransactionSource(factory);
const app = new TransactionApplication(source);
app.run();
