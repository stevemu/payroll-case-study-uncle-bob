import { CommissionedClassification } from '@/src/classification/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '@/src/paymentSchedule/BiweeklySchedule';
import { AddEmployeeTransaction } from '../AddEmployeeTransaction.base';
import { Classification } from '@/src/classification/Classification.interface';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

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
  getSchedule(): PaymentSchedule {
    return new BiweeklySchedule();
  }
}
