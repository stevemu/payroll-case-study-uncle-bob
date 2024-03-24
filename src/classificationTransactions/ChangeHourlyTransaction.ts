import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { HourlyClassification } from '../classifications/HourlyClassification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './ChangeClassificationTransaction.ts';
import { WeeklySchedule } from '../schedules/WeeklySchedule.ts';

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
