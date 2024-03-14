import { PayCheck } from '@/src/PayCheck';
import { Affiliation } from '../Affiliation.interface';

export class NoAffiliation implements Affiliation {
  calculateDeductions(payCheck: PayCheck): number {
    return 0;
  }
}
