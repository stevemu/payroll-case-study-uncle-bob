import { CommissionedClassification } from '@/src/paymentClassification/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '@/src/schedule/BiweeklySchedule';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.base';
import { Classification } from '@/src/paymentClassification/Classification.abstract';
import { Schedule } from '@/src/schedule/Schedule.interface';

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
