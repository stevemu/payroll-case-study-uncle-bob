import { AddEmployeeTransaction } from './AddEmployeeTransaction.ts';
import { SalariedClassification } from '../classifications/SalariedClassification.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { MonthlySchedule } from '../schedules/MonthlySchedule.ts';

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
