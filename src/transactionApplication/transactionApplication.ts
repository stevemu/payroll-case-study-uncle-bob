import { PrismaClient } from '@prisma/client';
import { PrismaPayrollDatabase } from '../payrollDatabaseImpl/PrismaPayrollDatabase/index.ts';
import { config } from '../../configs/prod.config.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { TextParserTransactionSource } from '../textParserTransactionSource/TextParserTransactionSource.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);

const source = new TextParserTransactionSource(db);
source.run();
