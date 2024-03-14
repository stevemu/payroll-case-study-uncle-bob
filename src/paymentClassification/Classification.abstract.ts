import { PayCheck } from '../PayCheck';

export abstract class Classification {
  abstract calculatePay(payCheck: PayCheck): number;
}
