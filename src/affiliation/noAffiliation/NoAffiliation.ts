import { PayCheck } from '../../PayCheck.ts';
import { Affiliation } from '../Affiliation.interface.ts';

export class NoAffiliation implements Affiliation {
  calculateDeductions(payCheck: PayCheck): number {
    return 0;
  }
}
