import { gPayrollDatabase } from '../../../database/PayrollDatabase.ts';
import { SalariedClassification } from '../../../paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../../schedule/MonthlySchedule.ts';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeSalariedTransaction } from './ChangeSalariedTransaction.ts';

describe('ChangeSalariedTransaction', () => {
  it('should change employee to salaried', () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeSalaried = new ChangeSalariedTransaction(empId, 1000);
    changeSalaried.execute();

    const employee = gPayrollDatabase.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(SalariedClassification);
    expect((employee!.classification as SalariedClassification).salary).toBe(1000);
    expect(employee!.schedule).toBeInstanceOf(MonthlySchedule);
  });
});
