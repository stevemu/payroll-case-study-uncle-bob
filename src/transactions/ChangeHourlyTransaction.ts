import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../domain/abstracts/Classification.ts';
import { PaymentSchedule } from '../domain/abstracts/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './abstracts/ChangeClassificationTransaction.ts';
import { HourlyClassification } from '../domain/HourlyClassification.ts';
import { WeeklySchedule } from '../domain/WeeklySchedule.ts';

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
