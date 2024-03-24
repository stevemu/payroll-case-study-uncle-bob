import { PrismaClient } from '@prisma/client';
import { config } from '../../configs/prod.config.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PrismaPayrollDatabase } from '../payrollDatabaseImpl/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { TransactionApplication } from '../transactionApplication/TransactionApplication.ts';
import { TextParserTransactionSource } from '../textParserTransactionSource/TextParserTransactionSource.ts';
import { TransactionFactoryImpl } from '../transactionImpl/TransactionFactoryImpl.ts';
import { PayrollFactoryImpl } from '../payrollImpl/PayrollFactoryImpl.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);

const payrollFactory = new PayrollFactoryImpl();
const transactionFactory = new TransactionFactoryImpl(db, payrollFactory);
const source = new TextParserTransactionSource(transactionFactory);
const app = new TransactionApplication(source);
app.run();