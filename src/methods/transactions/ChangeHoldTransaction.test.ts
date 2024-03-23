import { MapPayrollDatabase } from '../../databaseImpl/MapPayrollDatabase.ts';
import { HoldMethod } from '../HoldMethod.ts';
import { AddSalariedEmployeeTransaction } from '../../classifications/transactions/addEmployee/AddSalariedEmployeeTransaction.ts';
import { ChangeHoldTransaction } from './ChangeHoldTransaction.ts';

describe('ChangeHoldTransaction', () => {
  it('should change employee to hold', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000);
    await addEmp.execute();

    const changeHold = new ChangeHoldTransaction(db, empId, 'Hold');
    await changeHold.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(HoldMethod);
    expect((employee!.method as HoldMethod).address).toBe('Hold');
  });
});