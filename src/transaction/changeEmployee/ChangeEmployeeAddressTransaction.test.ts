import { gPayrollDatabase } from '../../database/index.ts';
import { AddHourlyEmployeeTransaction } from '../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeEmployeeAddressTransaction } from './ChangeEmployeeAddressTransaction.ts';

describe('ChangeEmployeeAddressTransaction', () => {
  it('should change employee address', async () => {
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      employeeId,
      'Bill',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const transaction = new ChangeEmployeeAddressTransaction(employeeId, 'Office');
    await transaction.execute();

    const employee = await gPayrollDatabase.getEmployee(employeeId)!;
    expect(employee!.address).toBe('Office');
  });
});
