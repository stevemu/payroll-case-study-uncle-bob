import { gPayrollDatabase } from '@/src/PayrollDatabase.ts';
import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification.ts';
import { HoldMethod } from '@/src/method/HoldMethod.ts';
import { WeeklySchedule } from '@/src/schedule/WeeklySchedule.ts';
import { AddHourlyEmployeeTransaction } from './AddHourlyEmployeeTransaction.ts';

describe('AddHourlyEmployee', () => {
  it('should add an hourly employee', () => {
    const empId = 1;
    const t = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gPayrollDatabase.getEmployee(empId)!;
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
