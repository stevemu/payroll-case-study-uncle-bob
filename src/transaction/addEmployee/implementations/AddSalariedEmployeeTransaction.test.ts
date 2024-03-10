import { AddSalariedEmployeeTransaction } from './AddSalariedEmployeeTransaction';
import { gpayrollDatabase } from '../../../PayrollDatabase';
import { SalariedClassification } from '../../../classification/SalariedClassification';
import { MonthlySchedule } from '../../../paymentSchedule/MonthlySchedule';
import { HoldMethod } from '../../../paymentMethod/HoldMethod';

describe('AddSalariedEmployee', () => {
  it('should add a salaried employee', () => {
    const empId = 1;
    const t = new AddSalariedEmployeeTransaction(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = gpayrollDatabase.getEmployee(empId);
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof SalariedClassification).toBe(true);

    const sc = pc as SalariedClassification;
    expect(sc.salary).toBe(1000.0);

    const ps = e.paymentSchedule;
    expect(ps instanceof MonthlySchedule).toBe(true);

    const pm = e.paymentMethod;
    expect(pm instanceof HoldMethod).toBe(true);
  });
});
