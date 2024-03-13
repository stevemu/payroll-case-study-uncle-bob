import { NullEmployee } from '../Employee';
import { gPayrollDatabase } from '../PayrollDatabase';
import { AddTimeCardTransaction } from './AddTimeCardTransaction';
import { PayTransaction } from './PayTransaction';
import { SalesReceiptTransaction } from './SalesReceiptTransaction';
import { AddCommissionedEmployeeTransaction } from './addEmployee/implementations/AddCommissionedEmployeeTransaction';
import { AddHourlyEmployeeTransaction } from './addEmployee/implementations/AddHourlyEmployeeTransaction';
import { AddSalariedEmployeeTransaction } from './addEmployee/implementations/AddSalariedEmployeeTransaction';

describe('PayTransaction', () => {
  test('pay single salaried employee', () => {
    const empId = 2;
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(empId, 'Bill', 'Home', 1000);
    addSalariedEmployee.execute();

    const payDate = new Date(2001, 10, 30); // last day of month
    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 1000);
  });

  test('pay single salaried employee on wrong date', () => {
    const empId = 2;
    const payDate = new Date(2001, 10, 29); // not last day of month
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(empId, 'Bill', 'Home', 1000);
    addSalariedEmployee.execute();

    const payTransaction = new PayTransaction(payDate);
    payTransaction.execute();

    const e = gPayrollDatabase.getEmployee(empId);
    expect(e).not.toBeInstanceOf(NullEmployee);

    const pc = payTransaction.getPayCheck(empId);
    expect(pc).toBeNull();
  });

  test('pay single hourly employee no time cards', () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 4), payDate, 0);
  });

  test('pay single hourly employee one time card', () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const timeCardTransaction = new AddTimeCardTransaction(empId, payDate, 2.0);
    timeCardTransaction.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 4), payDate, 30.5);
  });

  test('pay single hourly employee on wrong date', () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 8); // Thursday
    const timeCardTransaction = new AddTimeCardTransaction(empId, payDate, 9.0);
    timeCardTransaction.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    expect(pt.getPayCheck(empId)).toBeNull();
  });

  test('pay single hourly employee two time cards', () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const timeCardTransaction = new AddTimeCardTransaction(empId, payDate, 2.0);
    timeCardTransaction.execute();

    const timeCardTransaction2 = new AddTimeCardTransaction(empId, new Date(2001, 10, 8), 5.0);
    timeCardTransaction2.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 4), payDate, 7 * 15.25);
  });

  test('pay single hourly employee with time cards spanning two pay periods', () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const payDate = new Date(2001, 10, 9); // Friday
    const timeCardTransaction = new AddTimeCardTransaction(empId, payDate, 2.0);
    timeCardTransaction.execute();

    const timeCardTransaction2 = new AddTimeCardTransaction(empId, new Date(2001, 10, 2), 5.0);
    timeCardTransaction2.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 4), payDate, 2 * 15.25);
  });

  test('pay single commission employee no sales - pay day is 15th', () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15); // second Friday
    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500);
  });

  test('pay single commission employee no sales - pay day is last day of month', () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 30); // second Friday
    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 16), payDate, 500);
  });

  test('pay single commission employee one sale', () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15); // second Friday
    const salesReceiptTransaction = new SalesReceiptTransaction(empId, payDate, 100);
    salesReceiptTransaction.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 100 * 0.1);
  });

  test('pay single commission employee one sale spanning two pay periods', () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15);

    const salesReceiptTransaction = new SalesReceiptTransaction(empId, new Date(2001, 10, 15), 100);
    salesReceiptTransaction.execute();

    const salesReceiptTransaction2 = new SalesReceiptTransaction(empId, new Date(2001, 9, 30), 100);
    salesReceiptTransaction2.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 100 * 0.1);
  });

  test('pay single commission employee two sales', () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 15);

    const salesReceiptTransaction = new SalesReceiptTransaction(empId, payDate, 100);
    salesReceiptTransaction.execute();

    const salesReceiptTransaction2 = new SalesReceiptTransaction(empId, new Date(2001, 10, 2), 200);
    salesReceiptTransaction2.execute();

    const pt = new PayTransaction(payDate);
    pt.execute();

    validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 300 * 0.1);
  });

  test('pay single commissioned employee on wrong date', () => {
    const empId = 2;
    const addCommissionedEmployee = new AddCommissionedEmployeeTransaction(
      empId,
      'Bill',
      'Home',
      1000,
      0.1,
    );
    addCommissionedEmployee.execute();

    const payDate = new Date(2001, 10, 8);
    const pt = new PayTransaction(payDate);
    pt.execute();

    expect(pt.getPayCheck(empId)).toBeNull();
  });
});

function validatePaycheck(
  pt: PayTransaction,
  empId: number,
  payPeriodStartDate: Date,
  payDate: Date,
  pay: number,
) {
  const pc = pt.getPayCheck(empId);
  expect(pc).not.toBeNull();
  expect(pc!.payPeriodStartDate).toEqual(payPeriodStartDate);
  expect(pc!.payDate).toEqual(payDate);
  expect(pc!.grossPay).toBe(pay);
  expect(pc!.disposition).toBe('Hold');
  expect(pc!.deductions).toBe(0);
  expect(pc!.netPay).toBe(pay);
}
