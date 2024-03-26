import { AddEmployeeTransaction } from './abstracts/AddEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { SalariedClassification } from '../domain/SalariedClassification.ts';
import { MonthlySchedule } from '../domain/MonthlySchedule.ts';

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
