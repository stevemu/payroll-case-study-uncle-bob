import { Classification } from '../../../paymentClassification/Classification.abstract';
import { HourlyClassification } from '../../../paymentClassification/hourly/HourlyClassification';
import { Schedule } from '../../../schedule/Schedule.interface';
import { WeeklySchedule } from '../../../schedule/WeeklySchedule';
import { ChangeClassification } from './ChangeClassification.abstract';

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
