import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { BiweeklySchedule } from '../../schedules/BiweeklySchedule.ts';
import { CommissionedClassification } from '../classifications/commissioned/CommissionedClassification.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';

export class ChangeCommissionedTransaction extends ChangeClassification {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private salary: number,
    private commissionRate: number,
  ) {
    super(db, empId);
  }
  get paymentClassification() {
    return new CommissionedClassification(this.salary, this.commissionRate);
  }
  get paymentSchedule() {
    return new BiweeklySchedule();
  }
}
