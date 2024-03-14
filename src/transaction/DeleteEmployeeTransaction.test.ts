import { gPayrollDatabase } from '../PayrollDatabase';
import { DeleteEmployeeTransaction } from './DeleteEmployeeTransaction';
import { AddSalariedEmployeeTransaction } from './addEmployee/AddSalariedEmployeeTransaction';

describe('DeleteEmployeeTransaction', () => {
  it('should delete an employee', () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gPayrollDatabase.getEmployee(empId)!;
    expect(e.name).toBe('Bob');

    const t2 = new DeleteEmployeeTransaction(empId);
    t2.execute();

    const e2 = gPayrollDatabase.getEmployee(empId);
    expect(e2).toBeUndefined();
  });
});
