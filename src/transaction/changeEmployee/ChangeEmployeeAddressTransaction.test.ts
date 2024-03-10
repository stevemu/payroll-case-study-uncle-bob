import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { AddHourlyEmployeeTransaction } from '../addEmployee/implementations/AddHourlyEmployeeTransaction';
import { ChangeEmployeeAddressTransaction } from './ChangeEmployeeAddressTransaction';

describe('ChangeEmployeeAddressTransaction', () => {
  it('should change employee address', () => {
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      employeeId,
      'Bill',
      'Home',
      15.25,
    );
    addEmployeeTransaction.execute();

    const transaction = new ChangeEmployeeAddressTransaction(employeeId, 'Office');
    transaction.execute();

    const employee = gPayrollDatabase.getEmployee(employeeId);
    expect(employee.address).toBe('Office');
  });
});
