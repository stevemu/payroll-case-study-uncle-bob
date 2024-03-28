import { DirectMethod } from '../../src/domain/DirectMethod.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeDirectTransaction } from '../../src/transactions/ChangeDirectTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeDirectTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change employee to direct', async () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(
      db,

      empId,
      'Bob',
      'Home',
      27.52,
    );
    await addEmp.execute();

    const changeDirect = new ChangeDirectTransaction(db, empId, 'Bank', 'Account');
    await changeDirect.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(DirectMethod);
    expect((employee!.method as DirectMethod).bank).toBe('Bank');
    expect((employee!.method as DirectMethod).account).toBe('Account');
  });
});
