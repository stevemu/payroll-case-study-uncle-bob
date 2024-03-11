import { NullEmployee } from '../Employee';
import { gPayrollDatabase } from '../PayrollDatabase';
import { PayTransaction } from './PayTransaction';
import { AddSalariedEmployeeTransaction } from './addEmployee/implementations/AddSalariedEmployeeTransaction';

describe('PayTransaction', () => {
  test('pay single salaried employee', () => {
    const empId = 2;
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(empId, 'Bill', 'Home', 1000);
    addSalariedEmployee.execute();

    const payDate = new Date(2001, 10, 30);
    const pt = new PayTransaction(payDate);
    pt.execute();

    const pc = pt.getPayCheck(empId);
    expect(pc).not.toBeNull();
    expect(pc!.payDate).toEqual(payDate);
    expect(pc!.grossPay).toBe(1000);
    expect(pc!.disposition).toBe('Hold');
    expect(pc!.deductions).toBe(0);
    expect(pc!.netPay).toBe(1000);
  });

  test('pay single salaried employee on wrong date', () => {
    const empId = 2;
    const payDate = new Date(2001, 10, 29);
    const addSalariedEmployee = new AddSalariedEmployeeTransaction(empId, 'Bill', 'Home', 1000);
    addSalariedEmployee.execute();

    const payTransaction = new PayTransaction(payDate);
    payTransaction.execute();

    const e = gPayrollDatabase.getEmployee(empId);
    expect(e).not.toBeInstanceOf(NullEmployee);

    const pc = payTransaction.getPayCheck(empId);
    expect(pc).toBeNull();
  });
});
