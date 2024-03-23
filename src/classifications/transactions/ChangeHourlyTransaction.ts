import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../../payrollDomain/Classification.abstract.ts';
import { HourlyClassification } from '../classifications/hourly/HourlyClassification.ts';
import { Schedule } from '../../payrollDomain/Schedule.interface.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';
import { WeeklySchedule } from '../../schedules/WeeklySchedule.ts';

export class ChangeHourlyTransaction extends ChangeClassification {
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
