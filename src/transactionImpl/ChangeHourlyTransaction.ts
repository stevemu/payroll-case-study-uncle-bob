import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { HourlyClassification } from '../payrollImpl/HourlyClassification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from '../abstractTransactions/ChangeClassificationTransaction.ts';
import { WeeklySchedule } from '../payrollImpl/WeeklySchedule.ts';

export class ChangeHourlyTransaction extends ChangeClassificationTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private hourlyRate: number,
  ) {
    super(db, empId);
  }

  get paymentClassification(): PaymentClassification {
    return new HourlyClassification(this.hourlyRate);
  }
  get paymentSchedule(): PaymentSchedule {
    return new WeeklySchedule();
  }
}
