import { PaymentMethod } from './PaymentMethod.interface';

export class MailMethod implements PaymentMethod {
  constructor(private address: string) {}

  pay(): void {
    throw new Error('Method not implemented.');
  }
}
