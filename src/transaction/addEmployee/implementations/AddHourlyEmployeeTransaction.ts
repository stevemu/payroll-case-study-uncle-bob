import { WeeklySchedule } from '@/src/schedule/WeeklySchedule';
import { HourlyClassification } from '../../../classification/hourly/HourlyClassification';
import { AddEmployeeTransaction } from '../AddEmployeeTransaction.base';

export class AddHourlyEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    empId: number,
    name: string,
    address: string,
    private hourlyRate: number,
  ) {
    super(empId, name, address);
  }

  getClassification() {
    return new HourlyClassification(this.hourlyRate);
  }

  getSchedule() {
    return new WeeklySchedule();
  }
}
