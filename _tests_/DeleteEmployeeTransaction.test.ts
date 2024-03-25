import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { DeleteEmployeeTransaction } from '../src/transactionImpl/DeleteEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../src/transactionImpl/AddSalariedEmployeeTransaction.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';

describe('DeleteEmployeeTransaction', () => {
  it('should delete an employee', async () => {
    const db = new MapPayrollDatabase();
    const payrollFactory = new PayrollFactoryImpl();

    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(db, payrollFactory, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e!.name).toBe('Bob');

    const t2 = new DeleteEmployeeTransaction(db, empId);
    await t2.execute();

    const e2 = await db.getEmployee(empId);
    expect(e2).toBeUndefined();
  });
});
