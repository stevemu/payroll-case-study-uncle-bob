import { MapPayrollDatabase } from '../src/payrollDatabase/MapPayrollDatabase.ts';
import { MailMethod } from '../src/domain/impl/MailMethod.ts';
import { PayrollFactoryImpl } from '../src/domain/impl/factoryImpl/PayrollFactoryImpl.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMailTransaction } from '../src/transactions/ChangeMailTransaction.ts';

describe('ChangeMailTransaction', () => {
  it('should change to mail method', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(
      db,
      payrollFactory,
      empId,
      'Bob',
      'Home',
      27.52,
    );
    await addEmp.execute();

    const changeMail = new ChangeMailTransaction(db, payrollFactory, empId, 'Mail');
    await changeMail.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(MailMethod);
    expect((employee!.method as MailMethod).address).toBe('Mail');
  });
});
