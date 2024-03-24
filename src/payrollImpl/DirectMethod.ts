import { PaymentMethod } from '../payrollDomain/PaymentMethod.ts';

export class DirectMethod implements PaymentMethod {
  constructor(
    public bank: string,
    public account: string,
  ) {}

  pay(): void {}
}
