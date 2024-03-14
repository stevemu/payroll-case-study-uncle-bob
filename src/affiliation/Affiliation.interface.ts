import { PayCheck } from '../PayCheck';

export interface Affiliation {
  calculateDeductions(payCheck: PayCheck): number;
}
