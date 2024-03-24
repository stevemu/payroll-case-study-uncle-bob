import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeNameTransaction } from '../transactionImpl/ChangeNameTransaction.ts';

describe('ChangeEmployeeNameTransaction', () => {
  it('should change employee name', async () => {
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

    const transaction = new ChangeNameTransaction(db, employeeId, 'Bob');
    await transaction.execute();

    const employee = await db.getEmployee(employeeId);
    expect(employee!.name).toBe('Bob');
  });
});
