import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification.ts';
import { WeeklySchedule } from '@/src/schedule/WeeklySchedule.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';
import { Classification } from '@/src/paymentClassification/Classification.abstract.ts';
import { Schedule } from '@/src/schedule/Schedule.interface.ts';

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
