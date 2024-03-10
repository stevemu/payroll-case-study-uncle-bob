import { PaymentMethod } from './PaymentMethod.interface';

export class DirectMethod implements PaymentMethod {
  constructor(
    private bank: string,
    private account: string,
  ) {}

  pay(): void {
    throw new Error('Method not implemented.');
  }
}
