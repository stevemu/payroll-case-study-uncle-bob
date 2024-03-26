import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';

import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeNameTransaction } from '../../src/transactions/ChangeNameTransaction.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeEmployeeNameTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change employee name', async () => {
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      db,
      employeeId,
      'Bill',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const transaction = new ChangeNameTransaction(db, employeeId, 'Bob');
    await transaction.execute();

    const employee = await db.getEmployee(employeeId);
    expect(employee!.name).toBe('Bob');
  });
});
