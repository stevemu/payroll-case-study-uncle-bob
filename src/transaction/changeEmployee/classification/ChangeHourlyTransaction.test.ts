import { gPayrollDatabase } from '@/src/PayrollDatabase.ts';
import { AddCommissionedEmployeeTransaction } from '../../addEmployee/AddCommissionedEmployeeTransaction.ts';
import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification.ts';
import { WeeklySchedule } from '@/src/schedule/WeeklySchedule.ts';
import { ChangeHourlyTransaction } from './ChangeHourlyTransaction.ts';

describe('ChangeHourlyTransaction', () => {
  it('should change employee to hourly', () => {
    const empId = 1;
    const addEmp = new AddCommissionedEmployeeTransaction(empId, 'Bob', 'Home', 1000, 10);
    addEmp.execute();

    const changeHourly = new ChangeHourlyTransaction(empId, 27.52);
    changeHourly.execute();

    const employee = gPayrollDatabase.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(HourlyClassification);
    expect((employee!.classification as HourlyClassification).hourlyRate).toBe(27.52);
    expect(employee!.schedule).toBeInstanceOf(WeeklySchedule);
  });
});
