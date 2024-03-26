import { DeleteEmployeeTransaction } from '../../src/transactions/DeleteEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('DeleteEmployeeTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should delete an employee', async () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e!.name).toBe('Bob');

    const t2 = new DeleteEmployeeTransaction(db, empId);
    await t2.execute();

    const e2 = await db.getEmployee(empId);
    expect(e2).toBeUndefined();
  });
});
