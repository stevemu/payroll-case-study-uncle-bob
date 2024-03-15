import { Classification } from '../../paymentClassification/Classification.abstract.ts';
import { CommissionedClassification } from '../../paymentClassification/commissioned/CommissionedClassification.ts';
import { BiweeklySchedule } from '../../schedule/BiweeklySchedule.ts';
import { Schedule } from '../../schedule/Schedule.interface.ts';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.base.ts';

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
