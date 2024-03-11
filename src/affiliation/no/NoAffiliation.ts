import { Affiliation } from '../Affiliation.interface';

export class NoAffiliation implements Affiliation {
  calculateDeductions(date: Date): number {
    return 0;
  }
}
