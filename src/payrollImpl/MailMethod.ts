import { PaymentMethod } from '../payrollDomain/PaymentMethod.ts';

export class MailMethod implements PaymentMethod {
  constructor(public address: string) {}

  pay(): void {}
}
