import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { HoldMethod } from '@/src/method/HoldMethod';
import { AddSalariedEmployeeTransaction } from '../../addEmployee/AddSalariedEmployeeTransaction';
import { ChangeHoldTransaction } from './ChangeHoldTransaction';

describe('ChangeHoldTransaction', () => {
  it('should change employee to hold', () => {
    const empId = 1;
    const addEmp = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000);
    addEmp.execute();

    const changeHold = new ChangeHoldTransaction(empId);
    changeHold.execute();

    const employee = gPayrollDatabase.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(HoldMethod);
    expect((employee!.method as HoldMethod).address).toBe('Hold');
  });
});
