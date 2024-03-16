import { gPayrollDatabase } from '../database/index.ts';
import { DeleteEmployeeTransaction } from './DeleteEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from './addEmployee/AddSalariedEmployeeTransaction.ts';

describe('DeleteEmployeeTransaction', () => {
  it('should delete an employee', async () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = await gPayrollDatabase.getEmployee(empId);
    expect(e!.name).toBe('Bob');

    const t2 = new DeleteEmployeeTransaction(empId);
    await t2.execute();

    const e2 = await gPayrollDatabase.getEmployee(empId);
    expect(e2).toBeUndefined();
  });
});
