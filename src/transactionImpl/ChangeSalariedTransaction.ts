import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from '../abstractTransactions/ChangeClassificationTransaction.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class ChangeSalariedTransaction extends ChangeClassificationTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    private salary: number,
  ) {
    super(db, empId);
  }

  get paymentClassification(): PaymentClassification {
    return this.payrollFactory.makeSalaryClassification(this.salary);
  }

  get paymentSchedule(): PaymentSchedule {
    return this.payrollFactory.makeMonthlySchedule();
  }
}
