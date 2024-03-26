import { MonthlySchedule } from '../../src/domain/MonthlySchedule.ts';

import { SalariedClassification } from '../../src/domain/SalariedClassification.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeSalariedTransaction } from '../../src/transactions/ChangeSalariedTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeSalariedTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should change employee to salaried', async () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(
      db,

      empId,
      'Bob',
      'Home',
      27.52,
    );
    await addEmp.execute();

    const changeSalaried = new ChangeSalariedTransaction(db, empId, 1000);
    await changeSalaried.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(SalariedClassification);
    expect((employee!.classification as SalariedClassification).salary).toBe(1000);
    expect(employee!.schedule).toBeInstanceOf(MonthlySchedule);
  });
});
