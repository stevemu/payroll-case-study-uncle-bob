import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { BiweeklySchedule } from '../schedules/BiweeklySchedule.ts';
import { CommissionedClassification } from '../classifications/CommissionedClassification.ts';
import { ChangeClassificationTransaction } from './ChangeClassificationTransaction.ts';

export class ChangeCommissionedTransaction extends ChangeClassificationTransaction {
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
