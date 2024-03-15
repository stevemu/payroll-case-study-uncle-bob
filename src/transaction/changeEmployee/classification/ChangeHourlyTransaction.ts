import { Classification } from '../../../paymentClassification/Classification.abstract.ts';
import { HourlyClassification } from '../../../paymentClassification/hourly/HourlyClassification.ts';
import { Schedule } from '../../../schedule/Schedule.interface.ts';
import { WeeklySchedule } from '../../../schedule/WeeklySchedule.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';

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
