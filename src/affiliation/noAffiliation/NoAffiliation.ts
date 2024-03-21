import { PayCheck } from '../../PayCheck.ts';
import { Affiliation } from '../Affiliation.interface.ts';

export class NoAffiliation implements Affiliation {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateDeductions(payCheck: PayCheck): number {
    return 0;
  }
}
