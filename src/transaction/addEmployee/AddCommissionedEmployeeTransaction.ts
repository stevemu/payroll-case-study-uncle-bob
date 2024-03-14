import { Classification } from '../../paymentClassification/Classification.abstract';
import { CommissionedClassification } from '../../paymentClassification/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '../../schedule/BiweeklySchedule';
import { Schedule } from '../../schedule/Schedule.interface';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.base';

export class AddCommissionedEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    empId: number,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(empId, name, address);
  }

  getClassification(): Classification {
    return new CommissionedClassification(this.salary, this.commissionRate);
  }
  getSchedule(): Schedule {
    return new BiweeklySchedule();
  }
}
