import { Classification } from '@/src/classification/Classification.interface';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract';
import { Employee } from '@/src/Employee';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export abstract class ChangeClassification extends ChangeEmployeeTransaction {
  constructor(empId: number) {
    super(empId);
  }

  abstract get paymentClassification(): Classification;
  abstract get paymentSchedule(): PaymentSchedule;

  change(employee: Employee) {
    employee.classification = this.paymentClassification;
    employee.paymentSchedule = this.paymentSchedule;
  }
}
