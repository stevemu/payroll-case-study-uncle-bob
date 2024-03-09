import { CommissionedClassification } from '@/src/paymentClassification/implementations/commissioned/CommissionedClassification';
import { BiweeklySchedule } from '@/src/paymentSchedule/implementations/BiweeklySchedule';
import { AddEmployeeTransaction } from '../AddEmployeeTransaction.base';
import { PaymentClassification } from '@/src/paymentClassification/PaymentClassification.interface';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export class AddCommissionedEmployee extends AddEmployeeTransaction {
  constructor(
    empId: number,
    name: string,
    address: string,
    private salary: number,
    private commissionRate: number,
  ) {
    super(empId, name, address);
  }

  getClassification(): PaymentClassification {
    return new CommissionedClassification(this.salary, this.commissionRate);
  }
  getSchedule(): PaymentSchedule {
    return new BiweeklySchedule();
  }
}
