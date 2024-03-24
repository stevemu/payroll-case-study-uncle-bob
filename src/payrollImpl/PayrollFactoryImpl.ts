import { PayrollFactory } from '../payrollFactory/PayrollFactory';
import { BiweeklySchedule } from './BiweeklySchedule';
import { CommissionedClassification } from './CommissionedClassification';
import { DirectMethod } from './DirectMethod';
import { HoldMethod } from './HoldMethod';
import { HourlyClassification } from './HourlyClassification';
import { MailMethod } from './MailMethod';
import { MonthlySchedule } from './MonthlySchedule';
import { NoAffiliation } from './NoAffiliation';
import { SalariedClassification } from './SalariedClassification';
import { SalesReceipt } from './SalesReceipt';
import { ServiceCharge } from './ServiceCharge';
import { TimeCard } from './TimeCard';
import { UnionAffiliation } from './UnionAffiliation';
import { WeeklySchedule } from './WeeklySchedule';

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
