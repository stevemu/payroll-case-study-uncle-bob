import { PayCheck } from '../PayCheck.ts';
import { isBetween } from '../../utils/date.ts';
import { Affiliation } from '../Affiliation.ts';
import { ServiceCharge } from './ServiceCharge.ts';

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

  getServiceChargesInPayPeriod(startDate: Date, endDate: Date): number {
    return this.serviceCharges
      .filter((sc) => isBetween(sc.date, startDate, endDate))
      .reduce((acc, sc) => acc + sc.amount, 0);
  }

  calculateDeductions(payCheck: PayCheck): number {
    const fridays = this.numberOfFridaysInPayPeriod(
      payCheck.payPeriodStartDate,
      payCheck.payPeriodEndDate,
    );

    return (
      this.dues * fridays +
      this.getServiceChargesInPayPeriod(payCheck.payPeriodStartDate, payCheck.payPeriodEndDate)
    );
  }

  addServiceCharge(serviceCharge: ServiceCharge) {
    this.serviceCharges.push(serviceCharge);
  }

  addServiceCharges(serviceCharges: ServiceCharge[]) {
    this.serviceCharges.push(...serviceCharges);
  }

  getServiceCharges(): ServiceCharge[] {
    return this.serviceCharges;
  }

  getServiceCharge(date: Date): ServiceCharge | undefined {
    return this.serviceCharges.find((sc) => sc.date.getTime() === date.getTime());
  }
}
