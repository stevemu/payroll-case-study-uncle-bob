import { PayCheck } from '../PayCheck.ts';

export abstract class PaymentClassification {
  abstract calculatePay(payCheck: PayCheck): number;
}
