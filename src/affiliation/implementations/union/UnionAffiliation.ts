import { Affiliation } from '../../Affiliation.interface';
import { ServiceCharge } from './ServiceCharge';

export class UnionAffiliation implements Affiliation {
  constructor(
    public dues: number,
    public serviceCharges: ServiceCharge[],
  ) {}

  getFee(date: string): number {
    return 0;
  }
}
