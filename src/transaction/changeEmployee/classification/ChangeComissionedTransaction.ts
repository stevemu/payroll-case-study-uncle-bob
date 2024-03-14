import { CommissionedClassification } from '../../../paymentClassification/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '../../../schedule/BiweeklySchedule';
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
