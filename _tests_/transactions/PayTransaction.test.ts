import { AddServiceChargeTransaction } from '../../src/transactions/AddServiceChargeTransaction.ts';
import { AddTimeCardTransaction } from '../../src/transactions/TimeCardTransaction.ts';
import { PaydayTransaction } from '../../src/transactions/PaydayTransaction.ts';
import { SalesReceiptTransaction } from '../../src/transactions/SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from '../../src/transactions/AddCommissionedEmployeeTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../../src/transactions/ChangeMemberTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('PayTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  test('pay single salaried employee', async () => {
    const empId = 2;
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(db, empId, 'Bill', 'Home', 1000);
    await addSalariedEmployee.execute();

    const payDate = new Date(2001, 10, 30); // last day of month
    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 1000);
  });

  test('pay single salaried employee union dues', async () => {
    const empId = 2;
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(db, empId, 'Bill', 'Home', 1000);
    await addSalariedEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(db, empId, 7734, 9.42);
    await changeMemberTransaction.execute();

    const payDate = new Date(2001, 10, 30); // last day of month
    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    const e = await db.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const pc = pt.getPayCheck(empId);
    expect(pc).not.toBeNull();
    expect(pc!.grossPay).toBe(1000);
    expect(pc!.deductions).toBe(5 * 9.42);
    expect(pc!.netPay).toBe(1000 - 5 * 9.42);
  });

  test('pay single salaried employee on wrong date', async () => {
    const empId = 2;
    const payDate = new Date(2001, 10, 29); // not last day of month
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(db, empId, 'Bill', 'Home', 1000);
    await addSalariedEmployee.execute();

    const payTransaction = new PaydayTransaction(db, payDate);
    await payTransaction.execute();

    const e = await db.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const pc = payTransaction.getPayCheck(empId);
    expect(pc).toBeNull();
  });

  test('pay single hourly employee no time cards', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 3), payDate, 0);
  });

  test('pay single hourly employee one time card', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const timeCardTransaction = new AddTimeCardTransaction(db, empId, payDate, 2.0);
    await timeCardTransaction.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 3), payDate, 30.5);
  });

  test('pay single hourly employee on wrong date', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 8); // Thursday
    const timeCardTransaction = new AddTimeCardTransaction(db, empId, payDate, 9.0);
    await timeCardTransaction.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    expect(pt.getPayCheck(empId)).toBeNull();
  });

  test('pay single hourly employee two time cards', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2024, 2, 22); // Friday

    const timeCardTransaction = new AddTimeCardTransaction(db, empId, payDate, 2.0);
    await timeCardTransaction.execute();

    const timeCardTransaction2 = new AddTimeCardTransaction(db, empId, new Date(2024, 2, 16), 5.0);
    await timeCardTransaction2.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2024, 2, 16), payDate, 7 * 15.25);
  });

  test('pay single hourly employee with time cards spanning two pay periods', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const timeCardTransaction = new AddTimeCardTransaction(db, empId, payDate, 2.0);
    await timeCardTransaction.execute();

    const timeCardTransaction2 = new AddTimeCardTransaction(db, empId, new Date(2001, 10, 2), 5.0);
    await timeCardTransaction2.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 3), payDate, 2 * 15.25);
  });

  test('pay single hourly employee with service charge', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const timeCardTransaction = new AddTimeCardTransaction(db, empId, payDate, 2.0);
    await timeCardTransaction.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(db, empId, 7734, 9.42);
    await changeMemberTransaction.execute();

    const addServiceChargeTransaction = new AddServiceChargeTransaction(db, 7734, payDate, 19.42);
    await addServiceChargeTransaction.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    const paycheck = pt.getPayCheck(empId);
    expect(paycheck).not.toBeNull();
    expect(paycheck!.grossPay).toBe(2 * 15.25);
    expect(paycheck!.deductions).toBe(9.42 + 19.42);
    expect(paycheck!.netPay).toBe(2 * 15.25 - (9.42 + 19.42));
    expect(paycheck!.disposition).toBe('Hold');
  });

  test('pay single commission employee no sales - pay day is 15th', async () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    await addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15); // second Friday
    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500);
  });

  test('pay single commission employee no sales - pay day is last day of month', async () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    await addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 30); // second Friday
    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 16), payDate, 500);
  });

  test('pay single commission employee one sale', async () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    await addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15); // second Friday
    const salesReceiptTransaction = new SalesReceiptTransaction(db, empId, payDate, 100);
    await salesReceiptTransaction.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 100 * 0.1);
  });

  test('pay single commission employee one sale spanning two pay periods', async () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    await addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15);

    const salesReceiptTransaction = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2001, 10, 15),
      100,
    );
    await salesReceiptTransaction.execute();

    const salesReceiptTransaction2 = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2001, 9, 30),
      100,
    );
    await salesReceiptTransaction2.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 100 * 0.1);
  });

  test('pay single commission employee two sales', async () => {
    const empId = 1;

    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    await addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15);

    const salesReceiptTransaction = new SalesReceiptTransaction(db, empId, payDate, 100);
    await salesReceiptTransaction.execute();

    const salesReceiptTransaction2 = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2001, 10, 2),
      200,
    );
    await salesReceiptTransaction2.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 300 * 0.1);
  });

  test('pay single commissioned employee on wrong date', async () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    await addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 8);
    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    expect(pt.getPayCheck(empId)).toBeNull();
  });

  test('service charge spanning multiple pay periods', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const earlyDate = new Date(2001, 10, 2);
    const lateDate = new Date(2001, 10, 16);

    const timeCardTransaction = new AddTimeCardTransaction(db, empId, payDate, 2.0);
    await timeCardTransaction.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(db, empId, 7734, 9.42);
    await changeMemberTransaction.execute();

    const addServiceChargeTransaction = new AddServiceChargeTransaction(db, 7734, payDate, 19.42);
    await addServiceChargeTransaction.execute();

    const addServiceChargeTransactionEarly = new AddServiceChargeTransaction(
      db,
      7734,
      earlyDate,
      19.42,
    );
    await addServiceChargeTransactionEarly.execute();

    const addServiceChargeTransactionLate = new AddServiceChargeTransaction(
      db,
      7734,
      lateDate,
      19.42,
    );
    await addServiceChargeTransactionLate.execute();

    const pt = new PaydayTransaction(db, payDate);
    await pt.execute();

    const paycheck = pt.getPayCheck(empId);
    expect(paycheck).not.toBeNull();
    expect(paycheck!.grossPay).toBe(2 * 15.25);
    expect(paycheck!.deductions).toBe(9.42 + 19.42);
    expect(paycheck!.netPay).toBe(2 * 15.25 - (9.42 + 19.42));
    expect(paycheck!.disposition).toBe('Hold');
  });
});

function validatePaycheck(
  pt: PaydayTransaction,
  empId: number,
  payPeriodStartDate: Date,
  payDate: Date,
  pay: number,
) {
  const pc = pt.getPayCheck(empId);
  expect(pc).not.toBeNull();
  expect(pc!.payPeriodStartDate).toEqual(payPeriodStartDate);
  expect(pc!.payPeriodEndDate).toEqual(payDate);
  expect(pc!.grossPay).toBe(pay);
  expect(pc!.disposition).toBe('Hold');
  expect(pc!.deductions).toBe(0);
  expect(pc!.netPay).toBe(pay);
}
