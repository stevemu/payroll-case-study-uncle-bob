import { AddSalariedEmployeeTransaction } from './AddSalariedEmployeeTransaction';
import { gPayrollDatabase } from '../../../PayrollDatabase';
import { SalariedClassification } from '../../../classification/SalariedClassification';
import { MonthlySchedule } from '../../../schedule/MonthlySchedule';
import { HoldMethod } from '../../../method/HoldMethod';

describe('AddSalariedEmployee', () => {
  it('should add a salaried employee', () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gPayrollDatabase.getEmployee(empId);
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
