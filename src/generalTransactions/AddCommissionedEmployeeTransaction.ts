import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { CommissionedClassification } from '../classifications/CommissionedClassification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.ts';
import { BiweeklySchedule } from '../schedules/BiweeklySchedule.ts';

export class AddCommissionedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification(): PaymentClassification {
    return new CommissionedClassification(this.salary, this.commissionRate);
  }
  getSchedule(): PaymentSchedule {
    return new BiweeklySchedule();
  }
}
