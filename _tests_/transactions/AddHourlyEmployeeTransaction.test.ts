import { HoldMethod } from '../../src/domain/HoldMethod.ts';
import { WeeklySchedule } from '../../src/domain/WeeklySchedule.ts';
import { HourlyClassification } from '../../src/domain/HourlyClassification.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('AddHourlyEmployee', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should add an hourly employee', async () => {
    const empId = 1;
    const t = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof HourlyClassification).toBe(true);

    const hc = pc as HourlyClassification;
    expect(hc.hourlyRate).toBe(1000.0);

    const ps = e.schedule;
    expect(ps instanceof WeeklySchedule).toBe(true);

    const pm = e.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});
