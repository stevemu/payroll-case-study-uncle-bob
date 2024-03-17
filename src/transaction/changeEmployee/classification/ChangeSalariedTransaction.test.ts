import { MapPayrollDatabase } from '../../../database/MapPayrollDatabase.ts';
import { SalariedClassification } from '../../../paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../../schedule/MonthlySchedule.ts';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeSalariedTransaction } from './ChangeSalariedTransaction.ts';

describe('ChangeSalariedTransaction', () => {
  it('should change employee to salaried', async () => {
    const db = new MapPayrollDatabase();
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', 27.52);
    await addEmp.execute();

    const changeSalaried = new ChangeSalariedTransaction(db, empId, 1000);
    await changeSalaried.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(SalariedClassification);
    expect((employee!.classification as SalariedClassification).salary).toBe(1000);
    expect(employee!.schedule).toBeInstanceOf(MonthlySchedule);
  });
});
