import { gPayrollDatabase } from '../../PayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeEmployeeNameTransaction } from './ChangeEmployeeNameTransaction.ts';

describe('ChangeEmployeeNameTransaction', () => {
  it('should change employee name', () => {
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      employeeId,
      'Bill',
      'Home',
      15.25,
    );
    addEmployeeTransaction.execute();

    const transaction = new ChangeEmployeeNameTransaction(employeeId, 'Bob');
    transaction.execute();

    const employee = gPayrollDatabase.getEmployee(employeeId);
    expect(employee!.name).toBe('Bob');
  });
});
