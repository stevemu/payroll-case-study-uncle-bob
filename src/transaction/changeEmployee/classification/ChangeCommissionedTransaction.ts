import { PayrollDatabase } from '../../../database/index.ts';
import { CommissionedClassification } from '../../../paymentClassification/commissioned/CommissionedClassification.ts';
import { BiweeklySchedule } from '../../../schedule/BiweeklySchedule.ts';
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
