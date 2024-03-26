import { MapPayrollDatabase } from '../../src/payrollDatabase/MapPayrollDatabase.ts';

import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeAddressTransaction } from '../../src/transactions/ChangeAddressTransaction.ts';

describe('ChangeEmployeeAddressTransaction', () => {
  it('should change employee address', async () => {
    const db = new MapPayrollDatabase();
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
