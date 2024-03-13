import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification';
import { HoldMethod } from '@/src/method/HoldMethod';
import { WeeklySchedule } from '@/src/schedule/WeeklySchedule';
import { AddHourlyEmployeeTransaction } from './AddHourlyEmployeeTransaction';

describe('AddHourlyEmployee', () => {
  it('should add an hourly employee', () => {
    const empId = 1;
    const t = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gPayrollDatabase.getEmployee(empId);
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
