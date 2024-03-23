import { AddEmployeeTransaction } from './AddEmployeeTransaction.base.ts';
import { SalariedClassification } from '../../payrollClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../schedule/MonthlySchedule.ts';
import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';

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
