import { BiweeklySchedule } from '../payrollImpl/BiweeklySchedule.ts';
import { CommissionedClassification } from '../payrollImpl/CommissionedClassification.ts';
import { DirectMethod } from '../payrollImpl/DirectMethod.ts';
import { HoldMethod } from '../payrollImpl/HoldMethod.ts';
import { HourlyClassification } from '../payrollImpl/HourlyClassification.ts';
import { MailMethod } from '../payrollImpl/MailMethod.ts';
import { MonthlySchedule } from '../payrollImpl/MonthlySchedule.ts';
import { NoAffiliation } from '../payrollImpl/NoAffiliation.ts';
import { SalariedClassification } from '../payrollImpl/SalariedClassification.ts';
import { SalesReceipt } from '../payrollImpl/SalesReceipt.ts';
import { ServiceCharge } from '../payrollImpl/ServiceCharge.ts';
import { TimeCard } from '../payrollImpl/TimeCard.ts';
import { UnionAffiliation } from '../payrollImpl/UnionAffiliation.ts';
import { WeeklySchedule } from '../payrollImpl/WeeklySchedule.ts';

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
