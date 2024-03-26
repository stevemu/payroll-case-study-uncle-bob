import { PaymentClassification } from '../domain/Classification.ts';
import { PaymentSchedule } from '../domain/PaymentSchedule.ts';
import { AddEmployeeTransaction } from './abstractTransactions/AddEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { CommissionedClassification } from '../domain/impl/CommissionedClassification.ts';
import { BiweeklySchedule } from '../domain/impl/BiweeklySchedule.ts';

export class AddCommissionedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification(): PaymentClassification {
    return new CommissionedClassification(this.salary, this.commissionRate);
  }
  getSchedule(): PaymentSchedule {
    return new BiweeklySchedule();
  }
}
