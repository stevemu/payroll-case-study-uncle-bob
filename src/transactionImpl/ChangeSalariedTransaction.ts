import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { SalariedClassification } from '../payrollImpl/SalariedClassification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from '../abstractTransactions/ChangeClassificationTransaction.ts';
import { MonthlySchedule } from '../payrollImpl/MonthlySchedule.ts';

export class ChangeSalariedTransaction extends ChangeClassificationTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private salary: number,
  ) {
    super(db, empId);
  }

  get paymentClassification(): PaymentClassification {
    return new SalariedClassification(this.salary);
  }
  get paymentSchedule(): PaymentSchedule {
    return new MonthlySchedule();
  }
}
