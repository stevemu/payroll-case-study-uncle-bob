import { PrismaClient } from '@prisma/client';
import { config } from './configs/prod.config.ts';
import { PayrollDatabase } from './src/database/index.ts';
import { PrismaPayrollDatabase } from './src/database/PrismaPayrollDatabase/index.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);
await db.clear();
