import { PayrollDatabase } from '../../../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../../../payrollDomain/Classification.abstract.ts';
import { CommissionedClassification } from '../../classifications/commissioned/CommissionedClassification.ts';
import { Schedule } from '../../../payrollDomain/Schedule.interface.ts';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.base.ts';
import { BiweeklySchedule } from '../../../schedules/BiweeklySchedule.ts';

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
  getSchedule(): Schedule {
    return new BiweeklySchedule();
  }
}
