import { Affiliation } from '../../Affiliation.interface';

export class NoAffiliation implements Affiliation {
  getFee(date: string): number {
    return 0;
  }
}
