import { AddEmployeeTransaction } from './AddEmployeeTransaction.base.ts';
import { SalariedClassification } from '../../paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../schedule/MonthlySchedule.ts';

export class AddSalariedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    empId: number,
    name: string,
    address: string,
    private salary: number,
  ) {
    super(empId, name, address);
  }

  getClassification() {
    return new SalariedClassification(this.salary);
  }
  getSchedule() {
    return new MonthlySchedule();
  }
}
