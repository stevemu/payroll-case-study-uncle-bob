import { PaymentMethod } from './abstracts/PaymentMethod.ts';

export class DirectMethod implements PaymentMethod {
  constructor(
    public bank: string,
    public account: string,
  ) {}

  pay(): void {}
}
