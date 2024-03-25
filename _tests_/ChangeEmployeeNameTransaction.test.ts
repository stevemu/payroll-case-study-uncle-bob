import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeNameTransaction } from '../src/transactionImpl/ChangeNameTransaction.ts';

describe('ChangeEmployeeNameTransaction', () => {
  it('should change employee name', async () => {
    const db = new MapPayrollDatabase();
    const payrollFactory = new PayrollFactoryImpl();
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

    const transaction = new ChangeNameTransaction(db, employeeId, 'Bob');
    await transaction.execute();

    const employee = await db.getEmployee(employeeId);
    expect(employee!.name).toBe('Bob');
  });
});