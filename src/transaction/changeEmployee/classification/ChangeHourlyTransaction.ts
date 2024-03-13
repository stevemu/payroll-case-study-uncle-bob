import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification';
import { WeeklySchedule } from '@/src/schedule/WeeklySchedule';
import { ChangeClassification } from './ChangeClassification.abstract';
import { Classification } from '@/src/paymentClassification/Classification.abstract';
import { Schedule } from '@/src/schedule/Schedule.interface';

export class ChangeHourlyTransaction extends ChangeClassification {
  constructor(
    empId: number,
    private hourlyRate: number,
  ) {
    super(empId);
  }

  get paymentClassification(): Classification {
    return new HourlyClassification(this.hourlyRate);
  }
  get paymentSchedule(): Schedule {
    return new WeeklySchedule();
  }
}
