import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { HourlyClassification } from '@/src/classification/hourly/HourlyClassification';
import { HoldMethod } from '@/src/paymentMethod/HoldMethod';
import { WeeklySchedule } from '@/src/paymentSchedule/WeeklySchedule';
import { AddHourlyEmployeeTransaction } from './AddHourlyEmployeeTransaction';

describe('AddHourlyEmployee', () => {
  it('should add an hourly employee', () => {
    const empId = 1;
    const t = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gpayrollDatabase.getEmployee(empId);
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof HourlyClassification).toBe(true);

    const hc = pc as HourlyClassification;
    expect(hc.hourlyRate).toBe(1000.0);

    const ps = e.paymentSchedule;
    expect(ps instanceof WeeklySchedule).toBe(true);

    const pm = e.paymentMethod;
    expect(pm instanceof HoldMethod).toBe(true);
  });
});
