import { HourlyClassification } from '../../src/domain/HourlyClassification.ts';
import { AddTimeCardTransaction } from '../../src/transactions/TimeCardTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('AddTimeCardTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should add a time card to an employee', async () => {
    const hours = 8;

    const employeeId = 1;
    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      db,

      employeeId,
      'Bob',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2021, 6, 1);
    const addTimeCardTransaction = new AddTimeCardTransaction(
      db,

      employeeId,
      date,
      hours,
    );
    await addTimeCardTransaction.execute();

    const employee = await db.getEmployee(employeeId);
    const timeCard = (employee!.classification as HourlyClassification).getTimeCard(date);
    expect(timeCard).toBeDefined();
    expect(timeCard!.hours).toBe(hours);
  });
});
