import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { DirectMethod } from '@/src/method/DirectMethod';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/implementations/AddHourlyEmployeeTransaction';
import { ChangeDirectTransaction } from './ChangeDirectTransaction';

describe('ChangeDirectTransaction', () => {
  it('should change employee to direct', () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeDirect = new ChangeDirectTransaction(empId, 'Bank', 'Account');
    changeDirect.execute();

    const employee = gPayrollDatabase.getEmployee(empId);
    expect(employee.method).toBeInstanceOf(DirectMethod);
    expect((employee.method as DirectMethod).bank).toBe('Bank');
    expect((employee.method as DirectMethod).account).toBe('Account');
  });
});
