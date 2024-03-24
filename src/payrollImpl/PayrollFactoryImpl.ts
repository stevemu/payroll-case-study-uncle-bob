import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';
import { BiweeklySchedule } from './BiweeklySchedule.ts';
import { CommissionedClassification } from './CommissionedClassification.ts';
import { DirectMethod } from './DirectMethod.ts';
import { HoldMethod } from './HoldMethod.ts';
import { HourlyClassification } from './HourlyClassification.ts';
import { MailMethod } from './MailMethod.ts';
import { MonthlySchedule } from './MonthlySchedule.ts';
import { NoAffiliation } from './NoAffiliation.ts';
import { SalariedClassification } from './SalariedClassification.ts';
import { SalesReceipt } from './SalesReceipt.ts';
import { ServiceCharge } from './ServiceCharge.ts';
import { TimeCard } from './TimeCard.ts';
import { UnionAffiliation } from './UnionAffiliation.ts';
import { WeeklySchedule } from './WeeklySchedule.ts';

export class PayrollFactoryImpl implements PayrollFactory {
  makeBiweeklySchedule(): BiweeklySchedule {
    return new BiweeklySchedule();
  }

  makeCommissionedClassification(
    salary: number,
    commissionRate: number,
  ): CommissionedClassification {
    return new CommissionedClassification(salary, commissionRate);
  }

  makeDirectMethod(bank: string, account: string) {
    return new DirectMethod(bank, account);
  }

  makeHoldMethod(address: string) {
    return new HoldMethod(address);
  }

  makeHourlyClassification(hourlyRate: number) {
    return new HourlyClassification(hourlyRate);
  }

  makeMailMethod(address: string) {
    return new MailMethod(address);
  }

  makeMonthlySchedule() {
    return new MonthlySchedule();
  }

  makeNoAffiliation() {
    return new NoAffiliation();
  }

  makeSalaryClassification(salary: number) {
    return new SalariedClassification(salary);
  }

  makeSalesReceipt(date: Date, amount: number) {
    return new SalesReceipt(date, amount);
  }

  makeServiceCharge(date: Date, amount: number) {
    return new ServiceCharge(date, amount);
  }

  makeTimeCard(date: Date, hours: number) {
    return new TimeCard(date, hours);
  }

  makeUnionAffiliation(memberId: number, dues: number) {
    return new UnionAffiliation(memberId, dues);
  }

  makeWeeklySchedule() {
    return new WeeklySchedule();
  }
}
