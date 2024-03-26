import { MapPayrollDatabase } from '../src/payrollDatabase/MapPayrollDatabase.ts';
import { DirectMethod } from '../src/domain/impl/DirectMethod.ts';

import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeDirectTransaction } from '../src/transactions/ChangeDirectTransaction.ts';

describe('ChangeDirectTransaction', () => {
  it('should change employee to direct', async () => {
    const db = new MapPayrollDatabase();
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
