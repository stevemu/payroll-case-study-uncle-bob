import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { HoldMethod } from '../src/payrollImpl/HoldMethod.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';
import { AddSalariedEmployeeTransaction } from '../src/transactionImpl/AddSalariedEmployeeTransaction.ts';
import { ChangeHoldTransaction } from '../src/transactionImpl/ChangeHoldTransaction.ts';

describe('ChangeHoldTransaction', () => {
  it('should change employee to hold', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddSalariedEmployeeTransaction(
      db,
      payrollFactory,
      empId,
      'Bob',
      'Home',
      1000,
    );
    await addEmp.execute();

    const changeHold = new ChangeHoldTransaction(db, payrollFactory, empId, 'Hold');
    await changeHold.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(HoldMethod);
    expect((employee!.method as HoldMethod).address).toBe('Hold');
  });
});
