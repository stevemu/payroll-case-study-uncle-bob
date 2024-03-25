import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { HoldMethod } from '../src/payrollImpl/HoldMethod.ts';
import { WeeklySchedule } from '../src/payrollImpl/WeeklySchedule.ts';
import { HourlyClassification } from '../src/payrollImpl/HourlyClassification.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactionImpl/AddHourlyEmployeeTransaction.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';

describe('AddHourlyEmployee', () => {
  it('should add an hourly employee', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const empId = 1;
    const t = new AddHourlyEmployeeTransaction(db, payrollFactory, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof HourlyClassification).toBe(true);

    const hc = pc as HourlyClassification;
    expect(hc.hourlyRate).toBe(1000.0);

    const ps = e.schedule;
    expect(ps instanceof WeeklySchedule).toBe(true);

    const pm = e.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});