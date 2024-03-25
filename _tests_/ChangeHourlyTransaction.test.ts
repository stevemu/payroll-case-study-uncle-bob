import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { WeeklySchedule } from '../src/payrollImpl/WeeklySchedule.ts';
import { HourlyClassification } from '../src/payrollImpl/HourlyClassification.ts';
import { AddCommissionedEmployeeTransaction } from '../src/transactionImpl/AddCommissionedEmployeeTransaction.ts';
import { ChangeHourlyTransaction } from '../src/transactionImpl/ChangeHourlyTransaction.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';

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
