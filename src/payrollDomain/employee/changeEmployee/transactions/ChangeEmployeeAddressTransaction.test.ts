import { MapPayrollDatabase } from '../../../../databaseImpl/MapPayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../../../../classifications/transactions/addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeEmployeeAddressTransaction } from './ChangeEmployeeAddressTransaction.ts';

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

    const transaction = new ChangeEmployeeAddressTransaction(db, employeeId, 'Office');
    await transaction.execute();

    const employee = await db.getEmployee(employeeId)!;
    expect(employee!.address).toBe('Office');
  });
});
