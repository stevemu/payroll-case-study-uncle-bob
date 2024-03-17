import { MapPayrollDatabase } from '../../../database/MapPayrollDatabase.ts';
import { HoldMethod } from '../../../method/HoldMethod.ts';
import { AddSalariedEmployeeTransaction } from '../../addEmployee/AddSalariedEmployeeTransaction.ts';
import { ChangeHoldTransaction } from './ChangeHoldTransaction.ts';

describe('ChangeHoldTransaction', () => {
  it('should change employee to hold', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000);
    await addEmp.execute();

    const changeHold = new ChangeHoldTransaction(db, empId);
    await changeHold.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(HoldMethod);
    expect((employee!.method as HoldMethod).address).toBe('Hold');
  });
});
