import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { SalariedClassification } from '../classifications/SalariedClassification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './ChangeClassificationTransaction.ts';
import { MonthlySchedule } from '../schedules/MonthlySchedule.ts';

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
