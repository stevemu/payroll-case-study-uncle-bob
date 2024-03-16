import { gPayrollDatabase } from '../../database/index.ts';
import { HoldMethod } from '../../method/HoldMethod.ts';
import { CommissionedClassification } from '../../paymentClassification/commissioned/CommissionedClassification.ts';
import { BiweeklySchedule } from '../../schedule/BiweeklySchedule.ts';
import { AddCommissionedEmployeeTransaction } from './AddCommissionedEmployeeTransaction.ts';

describe('AddCommissionedEmployee', () => {
  it('should add a commissioned employee', () => {
    const empId = 1;
    const t = new AddCommissionedEmployeeTransaction(empId, 'Bob', 'Home', 1000.0, 0.5);
    t.execute();

    const e = gPayrollDatabase.getEmployee(empId)!;
    expect(e.name).toBe('Bob');

    const pc = e.classification;
    expect(pc instanceof CommissionedClassification).toBe(true);

    const cc = pc as CommissionedClassification;
    expect(cc.salary).toBe(1000.0);
    expect(cc.commissionRate).toBe(0.5);

    const ps = e.schedule;
    expect(ps instanceof BiweeklySchedule).toBe(true);

    const pm = e.method;
    expect(pm instanceof HoldMethod).toBe(true);
  });
});
