import { CommissionedClassification } from '@/src/paymentClassification/commissioned/CommissionedClassification.ts';
import { BiweeklySchedule } from '@/src/schedule/BiweeklySchedule.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';

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
