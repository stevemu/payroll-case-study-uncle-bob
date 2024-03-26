import { PrismaPayrollDatabase } from '../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { Employee } from '../src/domain/Employee.ts';
import { HourlyClassification } from '../src/domain/HourlyClassification.ts';
import { SalariedClassification } from '../src/domain/SalariedClassification.ts';
import { CommissionedClassification } from '../src/domain/CommissionedClassification.ts';
import { UnionAffiliation } from '../src/domain/UnionAffiliation.ts';
import { NoAffiliation } from '../src/domain/NoAffiliation.ts';
import { HoldMethod } from '../src/domain/HoldMethod.ts';
import { MailMethod } from '../src/domain/MailMethod.ts';
import { DirectMethod } from '../src/domain/DirectMethod.ts';
import { BiweeklySchedule } from '../src/domain/BiweeklySchedule.ts';
import { MonthlySchedule } from '../src/domain/MonthlySchedule.ts';
import { WeeklySchedule } from '../src/domain/WeeklySchedule.ts';
import { AddServiceChargeTransaction } from '../src/transactions/AddServiceChargeTransaction.ts';
import { ChangeMemberTransaction } from '../src/transactions/ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../src/transactions/ChangeUnaffiliatedTransaction.ts';
import { AddTimeCardTransaction } from '../src/transactions/TimeCardTransaction.ts';
import { ChangeCommissionedTransaction } from '../src/transactions/ChangeCommissionedTransaction.ts';
import { ChangeHourlyTransaction } from '../src/transactions/ChangeHourlyTransaction.ts';
import { ChangeSalariedTransaction } from '../src/transactions/ChangeSalariedTransaction.ts';
import { SalesReceiptTransaction } from '../src/transactions/SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from '../src/transactions/AddCommissionedEmployeeTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction.ts';
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

  test('hourly employee', async () => {
    const empId = 1;
    const hourlyRate = 20;
    const t = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', hourlyRate);
    await t.execute();

    const t2 = new AddTimeCardTransaction(db, empId, new Date(2021, 1, 1), 8);
    await t2.execute();

    const t3 = new AddTimeCardTransaction(db, empId, new Date(2021, 1, 2), 8);
    await t3.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).toBeInstanceOf(Employee);
    expect(e.name).toBe('Bob');
    expect(e.address).toBe('Home');

    const c = e.classification as HourlyClassification;
    expect(c).toBeInstanceOf(HourlyClassification);
    expect(c.hourlyRate).toBe(hourlyRate);
    expect(c.getTimeCard(new Date(2021, 1, 1))!.hours).toBe(8);
    expect(c.getTimeCard(new Date(2021, 1, 2))!.hours).toBe(8);
  });

  test('add salary employee', async () => {
    const empId = 1;
    const salary = 2000;
    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', salary);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);
    expect(e?.name).toBe('Bob');
    expect(e?.address).toBe('Home');
    expect(e?.classification).toBeInstanceOf(SalariedClassification);
    expect((e?.classification as SalariedClassification).salary).toBe(salary);
  });

  test('commissioned employee', async () => {
    const empId = 1;
    const salary = 2000;
    const commissionRate = 0.1;
    const t = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bob',
      'Home',
      salary,
      commissionRate,
    );
    await t.execute();

    const addSalesReceiptTransaction = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2021, 1, 1),
      100,
    );
    await addSalesReceiptTransaction.execute();

    const addSalesReceiptTransaction2 = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2021, 1, 2),
      200,
    );
    await addSalesReceiptTransaction2.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).toBeInstanceOf(Employee);
    expect(e.name).toBe('Bob');
    expect(e.address).toBe('Home');

    const c = e.classification as CommissionedClassification;
    expect(c).toBeInstanceOf(CommissionedClassification);
    expect(c.salary).toBe(salary);
    expect(c.commissionRate).toBe(commissionRate);
    expect(c.getSalesReceipt(new Date(2021, 1, 1))!.amount).toBe(100);
    expect(c.getSalesReceipt(new Date(2021, 1, 2))!.amount).toBe(200);
  });

  test('delete employee', async () => {
    const empId = 1;
    const salary = 2000;
    const commissionRate = 0.1;
    const t = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bob',
      'Home',
      salary,
      commissionRate,
    );
    await t.execute();

    let e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);

    await db.deleteEmployee(empId);
    e = await db.getEmployee(empId);
    expect(e).toBeUndefined();
  });

  test('union membership', async () => {
    const empId = 1;
    const memberId = 100;
    const salary = 2000;

    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', salary);
    await t.execute();

    const memberTransaction = new ChangeMemberTransaction(db, empId, memberId, 20);
    await memberTransaction.execute();

    const serviceChargeTransaction = new AddServiceChargeTransaction(
      db,
      memberId,
      new Date(2021, 1, 1),
      10,
    );
    await serviceChargeTransaction.execute();

    const serviceChargeTransaction2 = new AddServiceChargeTransaction(
      db,
      memberId,
      new Date(2021, 1, 2),
      20,
    );
    await serviceChargeTransaction2.execute();

    const e = (await db.getEmployee(empId))!;
    const a = e.affiliation as UnionAffiliation;
    expect(a).toBeInstanceOf(UnionAffiliation);
    expect(a.memberId).toBe(memberId);
    expect(a.dues).toBe(20);

    expect(a.getServiceCharge(new Date(2021, 1, 1))!.amount).toBe(10);
    expect(a.getServiceCharge(new Date(2021, 1, 2))!.amount).toBe(20);

    const noMemberTransaction = new ChangeUnaffiliatedTransaction(db, empId);
    await noMemberTransaction.execute();

    const e2 = (await db.getEmployee(empId))!;
    expect(e2.affiliation).toBeInstanceOf(NoAffiliation);
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
