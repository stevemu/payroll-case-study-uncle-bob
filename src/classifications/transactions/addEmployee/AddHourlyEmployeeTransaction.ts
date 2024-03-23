import { PayrollDatabase } from '../../../payrollDatabase/PayrollDatabase.interface.ts';
import { WeeklySchedule } from '../../../schedules/WeeklySchedule.ts';
import { HourlyClassification } from '../../hourly/HourlyClassification.ts';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.base.ts';

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
