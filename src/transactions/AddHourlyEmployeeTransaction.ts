import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { AddEmployeeTransaction } from './abstractTransactions/AddEmployeeTransaction.ts';
import { HourlyClassification } from '../domain/impl/HourlyClassification.ts';
import { WeeklySchedule } from '../domain/impl/WeeklySchedule.ts';

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
