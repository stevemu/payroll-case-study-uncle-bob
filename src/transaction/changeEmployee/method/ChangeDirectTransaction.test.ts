import { gPayrollDatabase } from '../../../database/index.ts';
import { DirectMethod } from '../../../method/DirectMethod.ts';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeDirectTransaction } from './ChangeDirectTransaction.ts';

describe('ChangeDirectTransaction', () => {
  it('should change employee to direct', async () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeDirect = new ChangeDirectTransaction(empId, 'Bank', 'Account');
    changeDirect.execute();

    const employee = await gPayrollDatabase.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(DirectMethod);
    expect((employee!.method as DirectMethod).bank).toBe('Bank');
    expect((employee!.method as DirectMethod).account).toBe('Account');
  });
});
