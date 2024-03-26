import { PaymentMethod } from './abstracts/PaymentMethod.ts';

export class HoldMethod implements PaymentMethod {
  constructor(public address: string) {}

  pay(): void {}
}
