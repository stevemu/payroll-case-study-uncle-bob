import { CommissionedClassification } from '@/src/paymentClassification/commissioned/CommissionedClassification.ts';
import { BiweeklySchedule } from '@/src/schedule/BiweeklySchedule.ts';
import { AddEmployeeTransaction } from './AddEmployeeTransaction.base.ts';
import { Classification } from '@/src/paymentClassification/Classification.abstract.ts';
import { Schedule } from '@/src/schedule/Schedule.interface.ts';

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
