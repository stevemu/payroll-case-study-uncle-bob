import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';
import { HourlyClassification } from '../../paymentClassification/hourly/HourlyClassification.ts';
import { WeeklySchedule } from '../../schedule/WeeklySchedule.ts';
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
