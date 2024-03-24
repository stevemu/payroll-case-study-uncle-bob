import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { WeeklySchedule } from '../payrollImpl/WeeklySchedule.ts';
import { HourlyClassification } from '../payrollImpl/HourlyClassification.ts';
import { AddEmployeeTransaction } from '../abstractTransactions/AddEmployeeTransaction.ts';

export class AddHourlyEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    name: string,
    address: string,
    private hourlyRate: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification() {
    return new HourlyClassification(this.hourlyRate);
  }

  getSchedule() {
    return new WeeklySchedule();
  }
}
