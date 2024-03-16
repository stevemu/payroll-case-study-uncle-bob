import { gPayrollDatabase } from '../../../database/index.ts';
import { HoldMethod } from '../../../method/HoldMethod.ts';
import { AddSalariedEmployeeTransaction } from '../../addEmployee/AddSalariedEmployeeTransaction.ts';
import { ChangeHoldTransaction } from './ChangeHoldTransaction.ts';

describe('ChangeHoldTransaction', () => {
  it('should change employee to hold', async () => {
    const empId = 1;
    const addEmp = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000);
    await addEmp.execute();

    const changeHold = new ChangeHoldTransaction(empId);
    await changeHold.execute();

    const employee = await gPayrollDatabase.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(HoldMethod);
    expect((employee!.method as HoldMethod).address).toBe('Hold');
  });
});
