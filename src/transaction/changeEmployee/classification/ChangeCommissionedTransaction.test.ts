import { gPayrollDatabase } from '../../../database/index.ts';
import { CommissionedClassification } from '../../../paymentClassification/commissioned/CommissionedClassification.ts';
import { BiweeklySchedule } from '../../../schedule/BiweeklySchedule.ts';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeCommissionedTransaction } from './ChangeComissionedTransaction.ts';

describe('ChangeCommissionedTransaction', () => {
  it('should change employee to commissioned', async () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeCommissioned = new ChangeCommissionedTransaction(empId, 1000, 0.5);
    changeCommissioned.execute();

    const employee = await gPayrollDatabase.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(CommissionedClassification);
    expect((employee!.classification as CommissionedClassification).salary).toBe(1000);
    expect((employee!.classification as CommissionedClassification).commissionRate).toBe(0.5);
    expect(employee!.schedule).toBeInstanceOf(BiweeklySchedule);
  });
});
