import { PayCheck } from './abstracts/PayCheck.ts';
import { Affiliation } from './abstracts/Affiliation.ts';

export class NoAffiliation implements Affiliation {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateDeductions(payCheck: PayCheck): number {
    return 0;
  }
}
