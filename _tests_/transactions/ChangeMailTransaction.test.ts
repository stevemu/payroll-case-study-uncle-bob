import { MailMethod } from '../../src/domain/MailMethod.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMailTransaction } from '../../src/transactions/ChangeMailTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeMailTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change to mail method', async () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', 27.52);
    await addEmp.execute();

    const changeMail = new ChangeMailTransaction(db, empId, 'Mail');
    await changeMail.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(MailMethod);
    expect((employee!.method as MailMethod).address).toBe('Mail');
  });
});
