import { Classification } from '@/src/classification/Classification.interface';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract';
import { Employee } from '@/src/Employee';
import { Schedule } from '@/src/schedule/Schedule.interface';

export abstract class ChangeClassification extends ChangeEmployeeTransaction {
  constructor(empId: number) {
    super(empId);
  }

  abstract get paymentClassification(): Classification;
  abstract get paymentSchedule(): Schedule;

  change(employee: Employee) {
    employee.classification = this.paymentClassification;
    employee.schedule = this.paymentSchedule;
  }
}
