import { PrismaPayrollDatabase } from '../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { Employee } from '../src/domain/Employee.ts';
import { HoldMethod } from '../src/domain/HoldMethod.ts';
import { MailMethod } from '../src/domain/MailMethod.ts';
import { DirectMethod } from '../src/domain/DirectMethod.ts';
import { BiweeklySchedule } from '../src/domain/BiweeklySchedule.ts';
import { MonthlySchedule } from '../src/domain/MonthlySchedule.ts';
import { WeeklySchedule } from '../src/domain/WeeklySchedule.ts';
import { ChangeCommissionedTransaction } from '../src/transactions/ChangeCommissionedTransaction.ts';
import { ChangeHourlyTransaction } from '../src/transactions/ChangeHourlyTransaction.ts';
import { ChangeSalariedTransaction } from '../src/transactions/ChangeSalariedTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../src/transactions/AddSalariedEmployeeTransaction.ts';
import { ChangeDirectTransaction } from '../src/transactions/ChangeDirectTransaction.ts';
import { ChangeHoldTransaction } from '../src/transactions/ChangeHoldTransaction.ts';
import { ChangeMailTransaction } from '../src/transactions/ChangeMailTransaction.ts';
import { testPrismaClient } from './_utils/prismaUtil.ts';

describe('PayrollDatabase', () => {
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

  test('payment schedule', async () => {
    const empId = 1;

    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 2000);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).toBeInstanceOf(Employee);
    expect(e.schedule).toBeInstanceOf(MonthlySchedule);

    const changeHourlyTransaction = new ChangeHourlyTransaction(db, empId, 20);
    await changeHourlyTransaction.execute();

    const e2 = (await db.getEmployee(empId))!;
    expect(e2.schedule).toBeInstanceOf(WeeklySchedule);

    const changeCommissionedTransaction = new ChangeCommissionedTransaction(db, empId, 2000, 0.1);
    await changeCommissionedTransaction.execute();

    const e3 = (await db.getEmployee(empId))!;
    expect(e3.schedule).toBeInstanceOf(BiweeklySchedule);

    const changeSalaryTransaction = new ChangeSalariedTransaction(db, empId, 2000);
    await changeSalaryTransaction.execute();

    const e4 = (await db.getEmployee(empId))!;
    expect(e4.schedule).toBeInstanceOf(MonthlySchedule);
  });
});
