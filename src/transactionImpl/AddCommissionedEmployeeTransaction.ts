import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { AddEmployeeTransaction } from '../abstractTransactions/AddEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class AddCommissionedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification(): PaymentClassification {
    return this.payrollFactory.makeCommissionedClassification(this.salary, this.commissionRate);
  }
  getSchedule(): PaymentSchedule {
    return this.payrollFactory.makeBiweeklySchedule();
  }
}
