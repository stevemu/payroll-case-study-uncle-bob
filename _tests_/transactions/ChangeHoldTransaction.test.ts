import { HoldMethod } from '../../src/domain/HoldMethod.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { ChangeHoldTransaction } from '../../src/transactions/ChangeHoldTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeHoldTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change employee to hold', async () => {
    const empId = 1;
    const addEmp = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000);
    await addEmp.execute();

    const changeHold = new ChangeHoldTransaction(db, empId, 'Hold');
    await changeHold.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(HoldMethod);
    expect((employee!.method as HoldMethod).address).toBe('Hold');
  });
});
