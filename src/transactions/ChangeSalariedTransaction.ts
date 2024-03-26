import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../domain/abstracts/Classification.ts';
import { PaymentSchedule } from '../domain/abstracts/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './abstracts/ChangeClassificationTransaction.ts';
import { SalariedClassification } from '../domain/SalariedClassification.ts';
import { MonthlySchedule } from '../domain/MonthlySchedule.ts';

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
