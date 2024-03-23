import { PayCheck } from '../PayCheck.ts';

export interface Method {
  pay(payCheck: PayCheck): void;
}
