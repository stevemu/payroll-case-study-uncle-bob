import { BiweeklySchedule } from '../../src/domain/BiweeklySchedule.ts';
import { CommissionedClassification } from '../../src/domain/CommissionedClassification.ts';

import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeCommissionedTransaction } from '../../src/transactions/ChangeCommissionedTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeCommissionedTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change employee to commissioned', async () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', 27.52);
    await addEmp.execute();

    const changeCommissioned = new ChangeCommissionedTransaction(
      db,

      empId,
      1000,
      0.5,
    );
    await changeCommissioned.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(CommissionedClassification);
    expect((employee!.classification as CommissionedClassification).salary).toBe(1000);
    expect((employee!.classification as CommissionedClassification).commissionRate).toBe(0.5);
    expect(employee!.schedule).toBeInstanceOf(BiweeklySchedule);
  });
});
