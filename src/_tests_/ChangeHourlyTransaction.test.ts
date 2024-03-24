import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { WeeklySchedule } from '../payrollImpl/WeeklySchedule.ts';
import { HourlyClassification } from '../payrollImpl/HourlyClassification.ts';
import { AddCommissionedEmployeeTransaction } from '../transactionImpl/AddCommissionedEmployeeTransaction.ts';
import { ChangeHourlyTransaction } from '../transactionImpl/ChangeHourlyTransaction.ts';
import { PayrollFactoryImpl } from '../payrollImpl/PayrollFactoryImpl.ts';

describe('ChangeHourlyTransaction', () => {
  it('should change employee to hourly', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddCommissionedEmployeeTransaction(
      db,
      payrollFactory,
      empId,
      'Bob',
      'Home',
      1000,
      10,
    );
    await addEmp.execute();

    const changeHourly = new ChangeHourlyTransaction(db, payrollFactory, empId, 27.52);
    await changeHourly.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(HourlyClassification);
    expect((employee!.classification as HourlyClassification).hourlyRate).toBe(27.52);
    expect(employee!.schedule).toBeInstanceOf(WeeklySchedule);
  });
});
