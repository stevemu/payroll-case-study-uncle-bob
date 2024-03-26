import { Affiliation } from '../../Affiliation.ts';
import { PaymentClassification } from '../../Classification.ts';
import { PaymentMethod } from '../../PaymentMethod.ts';
import { PaymentSchedule } from '../../PaymentSchedule.ts';
import { SalesReceipt } from '../SalesReceipt.ts';
import { ServiceCharge } from '../ServiceCharge.ts';
import { TimeCard } from '../TimeCard.ts';

export interface PayrollFactory {
  makeBiweeklySchedule(): PaymentSchedule;
  makeCommissionedClassification(salary: number, commissionRate: number): PaymentClassification;
  makeDirectMethod(bank: string, account: string): PaymentMethod;
  makeHoldMethod(address: string): PaymentMethod;
  makeHourlyClassification(hourlyRate: number): PaymentClassification;
  makeMailMethod(address: string): PaymentMethod;
  makeMonthlySchedule(): PaymentSchedule;
  makeNoAffiliation(): Affiliation;
  makeSalaryClassification(salary: number): PaymentClassification;
  makeSalesReceipt(date: Date, amount: number): SalesReceipt;
  makeServiceCharge(date: Date, amount: number): ServiceCharge;
  makeTimeCard(date: Date, hours: number): TimeCard;
  makeUnionAffiliation(memberId: number, dues: number): Affiliation;
  makeWeeklySchedule(): PaymentSchedule;
}
