import { AddEmployeeTransaction } from './abstractTransactions/AddEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { SalariedClassification } from '../domain/impl/SalariedClassification.ts';
import { MonthlySchedule } from '../domain/impl/MonthlySchedule.ts';

export class AddSalariedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    name: string,
    address: string,
    private salary: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification() {
    return new SalariedClassification(this.salary);
  }

  getSchedule() {
    return new MonthlySchedule();
  }
}
