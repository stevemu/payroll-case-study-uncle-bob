import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { BiweeklySchedule } from '../src/payrollImpl/BiweeklySchedule.ts';
import { CommissionedClassification } from '../src/payrollImpl/CommissionedClassification.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeCommissionedTransaction } from '../src/transactionImpl/ChangeCommissionedTransaction.ts';

describe('ChangeCommissionedTransaction', () => {
  it('should change employee to commissioned', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
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

    const changeCommissioned = new ChangeCommissionedTransaction(
      db,
      payrollFactory,
      empId,
      1000,
      0.5,
    );
    await changeCommissioned.execute();

    const employee = await db.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(CommissionedClassification);
    expect((employee!.classification as CommissionedClassification).salary).toBe(1000);
    expect((employee!.classification as CommissionedClassification).commissionRate).toBe(0.5);
    expect(employee!.schedule).toBeInstanceOf(BiweeklySchedule);
  });
});
