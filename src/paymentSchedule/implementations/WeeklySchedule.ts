import { PaymentSchedule } from '../PaymentSchedule.interface';

export class WeeklySchedule implements PaymentSchedule {
  isPayday(): boolean {
    throw new Error('Method not implemented.');
  }
}
