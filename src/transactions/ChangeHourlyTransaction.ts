import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../domain/Classification.ts';
import { PaymentSchedule } from '../domain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './abstractTransactions/ChangeClassificationTransaction.ts';
import { HourlyClassification } from '../domain/impl/HourlyClassification.ts';
import { WeeklySchedule } from '../domain/impl/WeeklySchedule.ts';

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
