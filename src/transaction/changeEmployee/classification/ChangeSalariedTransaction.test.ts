import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { SalariedClassification } from '@/src/paymentClassification/SalariedClassification';
import { MonthlySchedule } from '@/src/schedule/MonthlySchedule';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction';
import { ChangeSalariedTransaction } from './ChangeSalariedTransaction';

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