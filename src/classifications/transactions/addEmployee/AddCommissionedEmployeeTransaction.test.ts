import { MapPayrollDatabase } from '../../../databaseImpl/MapPayrollDatabase.ts';
import { HoldMethod } from '../../../methods/HoldMethod.ts';
import { BiweeklySchedule } from '../../../schedules/BiweeklySchedule.ts';
import { CommissionedClassification } from '../../commissioned/CommissionedClassification.ts';
import { AddCommissionedEmployeeTransaction } from './AddCommissionedEmployeeTransaction.ts';

describe('AddCommissionedEmployee', () => {
  it('should add a commissioned employee', async () => {
    const db = new MapPayrollDatabase();

    const empId = 1;
    const t = new AddCommissionedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000.0, 0.5);
    await t.execute();

    const e = await db.getEmployee(empId)!;
    expect(e!.name).toBe('Bob');

    const pc = e!.classification;
    expect(pc instanceof CommissionedClassification).toBe(true);

    const cc = pc as CommissionedClassification;
    expect(cc.salary).toBe(1000.0);
    expect(cc.commissionRate).toBe(0.5);

    const ps = e!.schedule;
    expect(ps instanceof BiweeklySchedule).toBe(true);

    const pm = e!.method as HoldMethod;
    expect(pm.address).toBe('Office');
  });
});
