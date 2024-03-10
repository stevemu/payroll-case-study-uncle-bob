import { Affiliation } from '../../Affiliation.interface';
import { NullServiceCharge, ServiceCharge } from './ServiceCharge';

export class UnionAffiliation implements Affiliation {
  private serviceCharges: ServiceCharge[] = [];

  constructor(public dues: number) {}

  getFee(date: string): number {
    return 0;
  }

  addServiceCharge(serviceCharge: ServiceCharge) {
    this.serviceCharges.push(serviceCharge);
  }

  getServiceCharges(): ServiceCharge[] {
    return this.serviceCharges;
  }

  getServiceCharge(date: string): ServiceCharge | NullServiceCharge {
    return this.serviceCharges.find((sc) => sc.date === date) || new NullServiceCharge();
  }
}
