import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeClassificationTransaction } from './abstractTransactions/ChangeClassificationTransaction.ts';
import { CommissionedClassification } from '../domain/impl/CommissionedClassification.ts';
import { BiweeklySchedule } from '../domain/impl/BiweeklySchedule.ts';

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
