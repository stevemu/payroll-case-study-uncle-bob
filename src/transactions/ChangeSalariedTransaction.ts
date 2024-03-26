import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../domain/Classification.ts';
import { PaymentSchedule } from '../domain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './abstractTransactions/ChangeClassificationTransaction.ts';
import { SalariedClassification } from '../domain/impl/SalariedClassification.ts';
import { MonthlySchedule } from '../domain/impl/MonthlySchedule.ts';

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
