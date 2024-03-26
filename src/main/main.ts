import { PrismaClient } from '@prisma/client';
import { config } from '../../configs/prod.config.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PrismaPayrollDatabase } from '../payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { TransactionApplication } from '../transactionApplication/TransactionApplication.ts';
import { TextParserTransactionSource } from '../textParserTransactionSource/TextParserTransactionSource.ts';
import { ConsoleReader } from '../reader/ConsoleReader.ts';
import { ConsoleLogger } from '../logger/ConsoleLogger.ts';
import { AppControllerImpl } from '../appController.ts/AppControllerImpl.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);
const consoleReader = new ConsoleReader();
const logger = new ConsoleLogger();
const appController = new AppControllerImpl();

const transactionSource = new TextParserTransactionSource(db, consoleReader);
const app = new TransactionApplication(transactionSource, logger, appController);
app.run();
