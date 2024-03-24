import { BiweeklySchedule } from '../payrollImpl/BiweeklySchedule';
import { CommissionedClassification } from '../payrollImpl/CommissionedClassification';
import { DirectMethod } from '../payrollImpl/DirectMethod';
import { HoldMethod } from '../payrollImpl/HoldMethod';
import { HourlyClassification } from '../payrollImpl/HourlyClassification';
import { MailMethod } from '../payrollImpl/MailMethod';
import { MonthlySchedule } from '../payrollImpl/MonthlySchedule';
import { NoAffiliation } from '../payrollImpl/NoAffiliation';
import { SalariedClassification } from '../payrollImpl/SalariedClassification';
import { SalesReceipt } from '../payrollImpl/SalesReceipt';
import { ServiceCharge } from '../payrollImpl/ServiceCharge';
import { TimeCard } from '../payrollImpl/TimeCard';
import { UnionAffiliation } from '../payrollImpl/UnionAffiliation';
import { WeeklySchedule } from '../payrollImpl/WeeklySchedule';

export interface PayrollFactory {
  makeBiweeklySchedule(): BiweeklySchedule;
  makeCommissionedClassification(
    salary: number,
    commissionRate: number,
  ): CommissionedClassification;
  makeDirectMethod(bank: string, account: string): DirectMethod;
  makeHoldMethod(address: string): HoldMethod;
  makeHourlyClassification(hourlyRate: number): HourlyClassification;
  makeMailMethod(address: string): MailMethod;
  makeMonthlySchedule(): MonthlySchedule;
  makeNoAffiliation(): NoAffiliation;
  makeSalaryClassification(salary: number): SalariedClassification;
  makeSalesReceipt(date: Date, amount: number): SalesReceipt;
  makeServiceCharge(date: Date, amount: number): ServiceCharge;
  makeTimeCard(date: Date, hours: number): TimeCard;
  makeUnionAffiliation(memberId: number, dues: number): UnionAffiliation;
  makeWeeklySchedule(): WeeklySchedule;
}
