import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { SalariedClassification } from '../../src/domain/SalariedClassification.ts';
import { HoldMethod } from '../../src/domain/HoldMethod.ts';
import { MonthlySchedule } from '../../src/domain/MonthlySchedule.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('AddSalariedEmployee', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should add a salaried employee', async () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof SalariedClassification).toBe(true);

    const sc = pc as SalariedClassification;
    expect(sc.salary).toBe(1000.0);

    const ps = e.schedule;
    expect(ps instanceof MonthlySchedule).toBe(true);

    const pm = e.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});
