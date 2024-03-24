import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { PayrollFactoryImpl } from '../payrollImpl/factoryImpl/PayrollFactoryImpl.ts';
import { AddHourlyEmployeeTransaction } from '../transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeAddressTransaction } from '../transactionImpl/ChangeAddressTransaction.ts';

describe('ChangeEmployeeAddressTransaction', () => {
  it('should change employee address', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      db,
      payrollFactory,
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
