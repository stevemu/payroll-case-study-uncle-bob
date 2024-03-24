import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { CommissionedClassification } from '../payrollImpl/CommissionedClassification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { AddEmployeeTransaction } from '../abstractTransactions/AddEmployeeTransaction.ts';
import { BiweeklySchedule } from '../payrollImpl/BiweeklySchedule.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';

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
