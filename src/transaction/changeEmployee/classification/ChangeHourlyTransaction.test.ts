import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { AddCommissionedEmployeeTransaction } from '../../addEmployee/AddCommissionedEmployeeTransaction';
import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification';
import { WeeklySchedule } from '@/src/schedule/WeeklySchedule';
import { ChangeHourlyTransaction } from './ChangeHourlyTransaction';

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
