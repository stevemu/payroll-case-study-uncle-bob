import { AddSalariedEmployeeTransaction } from '../src/transactionImpl/AddSalariedEmployeeTransaction.ts';
import { SalariedClassification } from '../src/payrollImpl/SalariedClassification.ts';
import { HoldMethod } from '../src/payrollImpl/HoldMethod.ts';
import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { MonthlySchedule } from '../src/payrollImpl/MonthlySchedule.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';

describe('AddSalariedEmployee', () => {
  it('should add a salaried employee', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(db, payrollFactory, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof SalariedClassification).toBe(true);

    const sc = pc as SalariedClassification;
    expect(sc.salary).toBe(1000.0);

    const ps = e.schedule;
    expect(ps instanceof MonthlySchedule).toBe(true);

    const pm = e.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});