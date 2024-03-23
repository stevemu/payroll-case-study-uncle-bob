import { MapPayrollDatabase } from '../../../databaseImpl/MapPayrollDatabase.ts';
import { HoldMethod } from '../../../methods/HoldMethod.ts';
import { WeeklySchedule } from '../../../schedules/WeeklySchedule.ts';
import { HourlyClassification } from '../../hourly/HourlyClassification.ts';
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

    const pm = e.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});
