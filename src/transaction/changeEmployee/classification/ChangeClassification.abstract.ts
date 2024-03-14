import { Employee } from '../../../Employee';
import { Classification } from '../../../paymentClassification/Classification.abstract';
import { Schedule } from '../../../schedule/Schedule.interface';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract';

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
