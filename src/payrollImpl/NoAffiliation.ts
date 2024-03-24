import { PayCheck } from '../payrollDomain/PayCheck.ts';
import { Affiliation } from '../payrollDomain/Affiliation.ts';

export class NoAffiliation implements Affiliation {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateDeductions(payCheck: PayCheck): number {
    return 0;
  }
}
