import { PayCheck } from '../PayCheck.ts';

export abstract class Classification {
  abstract calculatePay(payCheck: PayCheck): number;
}
