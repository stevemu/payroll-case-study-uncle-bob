import { AddEmployeeTransaction } from '../AddEmployeeTransaction.base';
import { SalariedClassification } from '../../../../paymentClassification/implementations/SalariedClassification';
import { MonthlySchedule } from '../../../../paymentSchedule/implementations/MonthlySchedule';

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
