import { PaymentMethod } from '../PaymentMethod.interface';

export class HoldMethod implements PaymentMethod {
  pay(): void {
    throw new Error('Method not implemented.');
  }
}
