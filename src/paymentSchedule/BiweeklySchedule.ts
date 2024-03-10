import { PaymentSchedule } from './PaymentSchedule.interface';

export class BiweeklySchedule implements PaymentSchedule {
  isPayday(): boolean {
    throw new Error('Method not implemented.');
  }
}
