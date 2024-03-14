import { PayCheck } from '../PayCheck';

export interface Method {
  pay(payCheck: PayCheck): void;
}
