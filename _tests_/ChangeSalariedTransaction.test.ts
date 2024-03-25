import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { MonthlySchedule } from '../src/payrollImpl/MonthlySchedule.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';
import { SalariedClassification } from '../src/payrollImpl/SalariedClassification.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeSalariedTransaction } from '../src/transactionImpl/ChangeSalariedTransaction.ts';

describe('ChangeSalariedTransaction', () => {
  it('should change employee to salaried', async () => {
    const db = new MapPayrollDatabase();
    const payrollFactory = new PayrollFactoryImpl();
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(
      db,
      payrollFactory,
      empId,
      'Bob',
      'Home',
      27.52,
    );
    await addEmp.execute();

    const changeSalaried = new ChangeSalariedTransaction(db, payrollFactory, empId, 1000);
    await changeSalaried.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(SalariedClassification);
    expect((employee!.classification as SalariedClassification).salary).toBe(1000);
    expect(employee!.schedule).toBeInstanceOf(MonthlySchedule);
  });
});
