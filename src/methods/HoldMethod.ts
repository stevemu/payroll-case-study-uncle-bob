import { PaymentMethod } from '../payrollDomain/PaymentMethod.ts';

export class HoldMethod implements PaymentMethod {
  constructor(public address: string) {}

  pay(): void {}
}
