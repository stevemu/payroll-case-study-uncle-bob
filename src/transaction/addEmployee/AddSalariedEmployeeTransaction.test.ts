import { AddSalariedEmployeeTransaction } from './AddSalariedEmployeeTransaction.ts';
import { gPayrollDatabase } from '../../database/index.ts';
import { SalariedClassification } from '../../paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../schedule/MonthlySchedule.ts';
import { HoldMethod } from '../../method/HoldMethod.ts';

describe('AddSalariedEmployee', () => {
  it('should add a salaried employee', () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gPayrollDatabase.getEmployee(empId)!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof SalariedClassification).toBe(true);

    const sc = pc as SalariedClassification;
    expect(sc.salary).toBe(1000.0);

    const ps = e.schedule;
    expect(ps instanceof MonthlySchedule).toBe(true);

    const pm = e.method;
    expect(pm instanceof HoldMethod).toBe(true);
  });
});
