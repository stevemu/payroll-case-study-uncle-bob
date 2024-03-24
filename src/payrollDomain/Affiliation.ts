import { PayCheck } from './PayCheck.ts';

export interface Affiliation {
  calculateDeductions(payCheck: PayCheck): number;
}
