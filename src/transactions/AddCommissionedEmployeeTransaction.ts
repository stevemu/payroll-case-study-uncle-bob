import { PaymentClassification } from '../domain/abstracts/Classification.ts';
import { PaymentSchedule } from '../domain/abstracts/PaymentSchedule.ts';
import { AddEmployeeTransaction } from './abstracts/AddEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { CommissionedClassification } from '../domain/CommissionedClassification.ts';
import { BiweeklySchedule } from '../domain/BiweeklySchedule.ts';

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
