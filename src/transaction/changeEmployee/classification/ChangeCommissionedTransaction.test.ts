import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { CommissionedClassification } from '@/src/paymentClassification/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '@/src/schedule/BiweeklySchedule';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction';
import { ChangeCommissionedTransaction } from './ChangeComissionedTransaction';

describe('ChangeCommissionedTransaction', () => {
  it('should change employee to commissioned', () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeCommissioned = new ChangeCommissionedTransaction(empId, 1000, 0.5);
    changeCommissioned.execute();

    const employee = gPayrollDatabase.getEmployee(empId);
    expect(employee!.classification).toBeInstanceOf(CommissionedClassification);
    expect((employee!.classification as CommissionedClassification).salary).toBe(1000);
    expect((employee!.classification as CommissionedClassification).commissionRate).toBe(0.5);
    expect(employee!.schedule).toBeInstanceOf(BiweeklySchedule);
  });
});
