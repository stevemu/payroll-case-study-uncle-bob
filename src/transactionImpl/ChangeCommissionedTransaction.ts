import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeClassificationTransaction } from '../abstractTransactions/ChangeClassificationTransaction.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class ChangeCommissionedTransaction extends ChangeClassificationTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    private salary: number,
    private commissionRate: number,
  ) {
    super(db, empId);
  }
  get paymentClassification() {
    return this.payrollFactory.makeCommissionedClassification(this.salary, this.commissionRate);
  }

  get paymentSchedule() {
    return this.payrollFactory.makeBiweeklySchedule();
  }
}
