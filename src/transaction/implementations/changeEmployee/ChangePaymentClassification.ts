import { PaymentClassification } from '@/src/classification/Classification.interface';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.base';
import { Employee } from '@/src/Employee';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export abstract class ChangePaymentClassification extends ChangeEmployeeTransaction {
  constructor(empId: number) {
    super(empId);
  }

  abstract get paymentClassification(): PaymentClassification;
  abstract get paymentSchedule(): PaymentSchedule;

  change(employee: Employee) {
    employee.classification = this.paymentClassification;
    employee.paymentSchedule = this.paymentSchedule;
  }
}
