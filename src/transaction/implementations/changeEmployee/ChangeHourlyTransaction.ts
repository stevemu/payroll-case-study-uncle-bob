import { HourlyClassification } from '@/src/classification/implementations/hourly/HourlyClassification';
import { WeeklySchedule } from '@/src/paymentSchedule/implementations/WeeklySchedule';
import { ChangePaymentClassification } from './ChangePaymentClassification';
import { PaymentClassification } from '@/src/classification/Classification.interface';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export class ChangeHourlyTransaction extends ChangePaymentClassification {
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
