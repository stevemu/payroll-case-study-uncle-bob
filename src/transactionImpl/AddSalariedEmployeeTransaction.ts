import { AddEmployeeTransaction } from '../abstractTransactions/AddEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class AddSalariedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    name: string,
    address: string,
    private salary: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification() {
    return this.payrollFactory.makeSalaryClassification(this.salary);
  }

  getSchedule() {
    return this.payrollFactory.makeMonthlySchedule();
  }
}
