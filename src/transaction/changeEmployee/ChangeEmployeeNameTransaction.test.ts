import { gPayrollDatabase } from '../../database/index.ts';
import { AddHourlyEmployeeTransaction } from '../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeEmployeeNameTransaction } from './ChangeEmployeeNameTransaction.ts';

describe('ChangeEmployeeNameTransaction', () => {
  it('should change employee name', async () => {
    const employeeId = 1;

    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      employeeId,
      'Bill',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const transaction = new ChangeEmployeeNameTransaction(employeeId, 'Bob');
    await transaction.execute();

    const employee = await gPayrollDatabase.getEmployee(employeeId);
    expect(employee!.name).toBe('Bob');
  });
});
