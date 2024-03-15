import { Employee } from '../../../Employee.ts';
import { Classification } from '../../../paymentClassification/Classification.abstract.ts';
import { Schedule } from '../../../schedule/Schedule.interface.ts';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract.ts';

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
