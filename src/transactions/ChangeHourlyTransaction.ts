import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../domain/Classification.ts';
import { PaymentSchedule } from '../domain/PaymentSchedule.ts';
import { ChangeClassificationTransaction } from './abstractTransactions/ChangeClassificationTransaction.ts';
import { PayrollFactory } from '../domain/impl/factoryImpl/PayrollFactory.ts';

export class ChangeHourlyTransaction extends ChangeClassificationTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    private hourlyRate: number,
  ) {
    super(db, empId);
  }

  get paymentClassification(): PaymentClassification {
    return this.payrollFactory.makeHourlyClassification(this.hourlyRate);
  }

  get paymentSchedule(): PaymentSchedule {
    return this.payrollFactory.makeWeeklySchedule();
  }
}
