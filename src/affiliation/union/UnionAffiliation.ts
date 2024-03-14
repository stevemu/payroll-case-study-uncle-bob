import { PayCheck } from '@/src/PayCheck';
import { Affiliation } from '../Affiliation.interface';
import { ServiceCharge } from './ServiceCharge';

export class UnionAffiliation implements Affiliation {
  private serviceCharges: ServiceCharge[] = [];

  constructor(
    public memberId: number,
    public dues: number,
  ) {}

  numberOfFridaysInPayPeriod(startDate: Date, endDate: Date): number {
    let fridays = 0;
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === 5) {
        fridays++;
      }
    }
    return fridays;
  }

  calculateDeductions(payCheck: PayCheck): number {
    const fridays = this.numberOfFridaysInPayPeriod(
      payCheck.payPeriodStartDate,
      payCheck.payPeriodEndDate,
    );
    return this.dues * fridays + this.getServiceCharges().reduce((acc, sc) => acc + sc.amount, 0);
  }

  addServiceCharge(serviceCharge: ServiceCharge) {
    this.serviceCharges.push(serviceCharge);
  }

  getServiceCharges(): ServiceCharge[] {
    return this.serviceCharges;
  }

  getServiceCharge(date: Date): ServiceCharge | undefined {
    return this.serviceCharges.find((sc) => sc.date === date);
  }
}
