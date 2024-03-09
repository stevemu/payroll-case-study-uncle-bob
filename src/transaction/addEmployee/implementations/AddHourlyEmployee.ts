import { WeeklySchedule } from '@/src/paymentSchedule/implementations/WeeklySchedule';
import { HourlyClassification } from '../../../paymentClassification/implementations/HourlyClassification';
import { AddEmployeeTransaction } from '../AddEmployeeTransaction.base';

export class AddHourlyEmployee extends AddEmployeeTransaction {
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
