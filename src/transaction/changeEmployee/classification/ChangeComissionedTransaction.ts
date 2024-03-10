import { CommissionedClassification } from '@/src/classification/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '@/src/schedule/BiweeklySchedule';
import { ChangeClassification } from './ChangeClassification.abstract';

export class ChangeCommissionedTransaction extends ChangeClassification {
  constructor(
    empId: number,
    private salary: number,
    private commissionRate: number,
  ) {
    super(empId);
  }
  get paymentClassification() {
    return new CommissionedClassification(this.salary, this.commissionRate);
  }
  get paymentSchedule() {
    return new BiweeklySchedule();
  }
}
