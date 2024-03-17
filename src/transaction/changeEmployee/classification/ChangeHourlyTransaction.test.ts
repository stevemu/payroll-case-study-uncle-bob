import { MapPayrollDatabase } from '../../../database/MapPayrollDatabase.ts';
import { HourlyClassification } from '../../../paymentClassification/hourly/HourlyClassification.ts';
import { WeeklySchedule } from '../../../schedule/WeeklySchedule.ts';
import { AddCommissionedEmployeeTransaction } from '../../addEmployee/AddCommissionedEmployeeTransaction.ts';
import { ChangeHourlyTransaction } from './ChangeHourlyTransaction.ts';

describe('ChangeHourlyTransaction', () => {
  it('should change employee to hourly', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddCommissionedEmployeeTransaction(db, empId, 'Bob', 'Home', 1000, 10);
    await addEmp.execute();

    const changeHourly = new ChangeHourlyTransaction(db, empId, 27.52);
    await changeHourly.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(HourlyClassification);
    expect((employee!.classification as HourlyClassification).hourlyRate).toBe(27.52);
    expect(employee!.schedule).toBeInstanceOf(WeeklySchedule);
  });
});
