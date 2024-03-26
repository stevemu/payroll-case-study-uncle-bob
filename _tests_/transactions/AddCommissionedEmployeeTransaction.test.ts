import { HoldMethod } from '../../src/domain/HoldMethod.ts';
import { BiweeklySchedule } from '../../src/domain/BiweeklySchedule.ts';
import { CommissionedClassification } from '../../src/domain/CommissionedClassification.ts';
import { AddCommissionedEmployeeTransaction } from '../../src/transactions/AddCommissionedEmployeeTransaction.ts';
import { PrismaClient } from '@prisma/client';
import { config } from '../../configs/test.config.ts';
import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });

describe('AddCommissionedEmployee', () => {
  const db = new PrismaPayrollDatabase(prisma);

  beforeEach(async () => {
    await db.clear();
  });

  it('should add a commissioned employee', async () => {
    const db = new PrismaPayrollDatabase(prisma);

    const empId = 1;
    const t = new AddCommissionedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0, 0.5);
    await t.execute();

    const e = await db.getEmployee(empId)!;
    expect(e!.name).toBe('Bob');

    const pc = e!.classification;
    expect(pc instanceof CommissionedClassification).toBe(true);

    const cc = pc as CommissionedClassification;
    expect(cc.salary).toBe(1000.0);
    expect(cc.commissionRate).toBe(0.5);

    const ps = e!.schedule;
    expect(ps instanceof BiweeklySchedule).toBe(true);

    const pm = e!.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});
