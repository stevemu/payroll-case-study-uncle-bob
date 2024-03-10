import { HourlyClassification } from '@/src/classification/hourly/HourlyClassification';
import { WeeklySchedule } from '@/src/paymentSchedule/WeeklySchedule';
import { ChangeClassification } from './ChangeClassification.abstract';
import { PaymentClassification } from '@/src/classification/Classification.interface';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export class ChangeHourlyTransaction extends ChangeClassification {
  constructor(
    empId: number,
    private hourlyRate: number,
  ) {
    super(empId);
  }

  get paymentClassification(): PaymentClassification {
    return new HourlyClassification(this.hourlyRate);
  }
  get paymentSchedule(): PaymentSchedule {
    return new WeeklySchedule();
  }
}
