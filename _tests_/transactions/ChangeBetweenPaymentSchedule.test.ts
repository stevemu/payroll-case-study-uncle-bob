import { PrismaPayrollDatabase } from '../../src/payrollDatabase/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { Employee } from '../../src/domain/Employee.ts';
import { BiweeklySchedule } from '../../src/domain/BiweeklySchedule.ts';
import { MonthlySchedule } from '../../src/domain/MonthlySchedule.ts';
import { WeeklySchedule } from '../../src/domain/WeeklySchedule.ts';
import { ChangeCommissionedTransaction } from '../../src/transactions/ChangeCommissionedTransaction.ts';
import { ChangeHourlyTransaction } from '../../src/transactions/ChangeHourlyTransaction.ts';
import { ChangeSalariedTransaction } from '../../src/transactions/ChangeSalariedTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeBetweenPaymentMethod', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  test('payment schedule', async () => {
    const empId = 1;

    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', 2000);
    await t.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).toBeInstanceOf(Employee);
    expect(e.schedule).toBeInstanceOf(MonthlySchedule);

    const changeHourlyTransaction = new ChangeHourlyTransaction(db, empId, 20);
    await changeHourlyTransaction.execute();

    const e2 = (await db.getEmployee(empId))!;
    expect(e2.schedule).toBeInstanceOf(WeeklySchedule);

    const changeCommissionedTransaction = new ChangeCommissionedTransaction(db, empId, 2000, 0.1);
    await changeCommissionedTransaction.execute();

    const e3 = (await db.getEmployee(empId))!;
    expect(e3.schedule).toBeInstanceOf(BiweeklySchedule);

    const changeSalaryTransaction = new ChangeSalariedTransaction(db, empId, 2000);
    await changeSalaryTransaction.execute();

    const e4 = (await db.getEmployee(empId))!;
    expect(e4.schedule).toBeInstanceOf(MonthlySchedule);
  });
});
