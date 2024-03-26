import { MapPayrollDatabase } from '../src/payrollDatabase/MapPayrollDatabase.ts';
import { MailMethod } from '../src/domain/impl/MailMethod.ts';

import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMailTransaction } from '../src/transactions/ChangeMailTransaction.ts';

describe('ChangeMailTransaction', () => {
  it('should change to mail method', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(
      db,

      empId,
      'Bob',
      'Home',
      27.52,
    );
    await addEmp.execute();

    const changeMail = new ChangeMailTransaction(db, empId, 'Mail');
    await changeMail.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(MailMethod);
    expect((employee!.method as MailMethod).address).toBe('Mail');
  });
});
