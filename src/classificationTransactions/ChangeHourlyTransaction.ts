import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../payrollDomain/Classification.abstract.ts';
import { HourlyClassification } from '../classifications/HourlyClassification.ts';
import { Schedule } from '../payrollDomain/Schedule.interface.ts';
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
  get paymentSchedule(): Schedule {
    return new WeeklySchedule();
  }
}
