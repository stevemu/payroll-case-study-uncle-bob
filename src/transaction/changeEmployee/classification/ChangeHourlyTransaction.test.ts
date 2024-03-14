import { gPayrollDatabase } from '../../../PayrollDatabase';
import { HourlyClassification } from '../../../paymentClassification/hourly/HourlyClassification';
import { WeeklySchedule } from '../../../schedule/WeeklySchedule';
import { AddCommissionedEmployeeTransaction } from '../../addEmployee/AddCommissionedEmployeeTransaction';
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
