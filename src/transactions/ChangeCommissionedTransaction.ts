import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeClassificationTransaction } from './abstracts/ChangeClassificationTransaction.ts';
import { CommissionedClassification } from '../domain/CommissionedClassification.ts';
import { BiweeklySchedule } from '../domain/BiweeklySchedule.ts';

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
