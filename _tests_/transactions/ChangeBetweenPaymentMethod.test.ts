import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { Employee } from '../../src/domain/Employee.ts';
import { HoldMethod } from '../../src/domain/HoldMethod.ts';
import { MailMethod } from '../../src/domain/MailMethod.ts';
import { DirectMethod } from '../../src/domain/DirectMethod.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { ChangeDirectTransaction } from '../../src/transactions/ChangeDirectTransaction.ts';
import { ChangeHoldTransaction } from '../../src/transactions/ChangeHoldTransaction.ts';
import { ChangeMailTransaction } from '../../src/transactions/ChangeMailTransaction.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeBetweenPaymentMethod', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  test('payment method', async () => {
    const empId = 1;
    const salary = 2000;

    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home1', salary);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e!).toBeInstanceOf(Employee);
    expect(e!.method).toBeInstanceOf(HoldMethod);
    expect((e!.method as HoldMethod).address).toBe('Office');

    const changeMailTransaction = new ChangeMailTransaction(db, empId, 'Mail');
    await changeMailTransaction.execute();

    const e2 = await db.getEmployee(empId);
    expect(e2!.method).toBeInstanceOf(MailMethod);
    expect((e2!.method as MailMethod).address).toBe('Mail');

    const changeDirectTransaction = new ChangeDirectTransaction(db, empId, 'Bank', 'Account');
    await changeDirectTransaction.execute();

    const e3 = (await db.getEmployee(empId))!;
    expect((e3.method as DirectMethod).bank).toBe('Bank');
    expect((e3.method as DirectMethod).account).toBe('Account');

    const changeHoldTransaction = new ChangeHoldTransaction(db, empId, 'Office');
    await changeHoldTransaction.execute();

    const e4 = (await db.getEmployee(empId))!;
    expect(e4.method).toBeInstanceOf(HoldMethod);
    expect((e4.method as HoldMethod).address).toBe('Office');
  });
});
