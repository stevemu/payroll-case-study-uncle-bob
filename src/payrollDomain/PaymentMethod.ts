import { PayCheck } from './PayCheck.ts';

export interface PaymentMethod {
  pay(payCheck: PayCheck): void;
}
