import { PaymentSchedule } from './PaymentSchedule.interface';

export class MonthlySchedule implements PaymentSchedule {
  isPayday(): boolean {
    throw new Error('Method not implemented.');
  }
}
