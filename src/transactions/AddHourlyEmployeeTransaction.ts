import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { AddEmployeeTransaction } from './abstracts/AddEmployeeTransaction.ts';
import { HourlyClassification } from '../domain/HourlyClassification.ts';
import { WeeklySchedule } from '../domain/WeeklySchedule.ts';

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
