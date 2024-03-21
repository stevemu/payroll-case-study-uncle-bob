import { AddSalariedEmployeeTransaction } from './AddSalariedEmployeeTransaction.ts';
import { SalariedClassification } from '../../paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../schedule/MonthlySchedule.ts';
import { HoldMethod } from '../../method/HoldMethod.ts';
import { MapPayrollDatabase } from '../../database/MapPayrollDatabase.ts';

describe('AddSalariedEmployee', () => {
  it('should add a salaried employee', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0);
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
