import { PayCheck } from '../../payrollDomain/PayCheck.ts';
import { Affiliation } from '../../payrollDomain/Affiliation.interface.ts';

export class NoAffiliation implements Affiliation {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateDeductions(payCheck: PayCheck): number {
    return 0;
  }
}
