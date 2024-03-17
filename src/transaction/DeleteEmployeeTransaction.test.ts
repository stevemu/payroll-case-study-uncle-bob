import { MapPayrollDatabase } from '../database/MapPayrollDatabase.ts';
import { DeleteEmployeeTransaction } from './DeleteEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from './addEmployee/AddSalariedEmployeeTransaction.ts';

describe('DeleteEmployeeTransaction', () => {
  it('should delete an employee', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e!.name).toBe('Bob');

    const t2 = new DeleteEmployeeTransaction(db, empId);
    await t2.execute();

    const e2 = await db.getEmployee(empId);
    expect(e2).toBeUndefined();
  });
});
