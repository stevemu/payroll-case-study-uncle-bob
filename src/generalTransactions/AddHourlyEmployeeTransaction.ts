import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { WeeklySchedule } from '../schedules/WeeklySchedule.ts';
import { HourlyClassification } from '../classifications/HourlyClassification.ts';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.ts';

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
