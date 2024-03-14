import { Classification } from '@/src/paymentClassification/Classification.abstract.ts';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract.ts';
import { Employee } from '@/src/Employee.ts';
import { Schedule } from '@/src/schedule/Schedule.interface.ts';

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
