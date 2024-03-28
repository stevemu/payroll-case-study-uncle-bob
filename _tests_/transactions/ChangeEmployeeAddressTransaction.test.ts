import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeAddressTransaction } from '../../src/transactions/ChangeAddressTransaction.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeEmployeeAddressTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change employee address', async () => {
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      db,

      employeeId,
      'Bill',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const transaction = new ChangeAddressTransaction(db, employeeId, 'Office');
    await transaction.execute();

    const employee = await db.getEmployee(employeeId)!;
    expect(employee!.address).toBe('Office');
  });
});
