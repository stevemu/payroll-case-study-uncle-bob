import { MapPayrollDatabase } from '../../database/MapPayrollDatabase.ts';
import { HoldMethod } from '../../method/HoldMethod.ts';
import { HourlyClassification } from '../../paymentClassification/hourly/HourlyClassification.ts';
import { WeeklySchedule } from '../../schedule/WeeklySchedule.ts';
import { AddHourlyEmployeeTransaction } from './AddHourlyEmployeeTransaction.ts';

describe('AddHourlyEmployee', () => {
  it('should add an hourly employee', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const t = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof HourlyClassification).toBe(true);

    const hc = pc as HourlyClassification;
    expect(hc.hourlyRate).toBe(1000.0);

    const ps = e.schedule;
    expect(ps instanceof WeeklySchedule).toBe(true);

    const pm = e.method;
    expect(pm instanceof HoldMethod).toBe(true);
  });
});
