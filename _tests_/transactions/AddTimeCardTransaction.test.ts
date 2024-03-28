import { HourlyClassification } from '../../src/domain/HourlyClassification.ts';
import { AddTimeCardTransaction } from '../../src/transactions/TimeCardTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';
import { Employee } from '../../src/domain/Employee.ts';

describe('AddTimeCardTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should add a time card to an employee', async () => {
    const empId = 1;
    const hourlyRate = 20;
    const t = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', hourlyRate);
    await t.execute();

    const t2 = new AddTimeCardTransaction(db, empId, new Date(2021, 1, 1), 8);
    await t2.execute();

    const t3 = new AddTimeCardTransaction(db, empId, new Date(2021, 1, 2), 8);
    await t3.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).toBeInstanceOf(Employee);
    expect(e.name).toBe('Bob');
    expect(e.address).toBe('Home');

    const c = e.classification as HourlyClassification;
    expect(c).toBeInstanceOf(HourlyClassification);
    expect(c.hourlyRate).toBe(hourlyRate);
    expect(c.getTimeCard(new Date(2021, 1, 1))!.hours).toBe(8);
    expect(c.getTimeCard(new Date(2021, 1, 2))!.hours).toBe(8);
  });
});
