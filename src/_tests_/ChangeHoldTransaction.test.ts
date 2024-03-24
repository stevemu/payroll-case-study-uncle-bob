import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { HoldMethod } from '../payrollImpl/HoldMethod.ts';
import { AddSalariedEmployeeTransaction } from '../transactionImpl/AddSalariedEmployeeTransaction.ts';
import { ChangeHoldTransaction } from '../transactionImpl/ChangeHoldTransaction.ts';

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
