import { Employee } from '../../../Employee.ts';
import { PayrollDatabase } from '../../../database/index.ts';
import { Classification } from '../../../paymentClassification/Classification.abstract.ts';
import { Schedule } from '../../../schedule/Schedule.interface.ts';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeClassification extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract get paymentClassification(): Classification;
  abstract get paymentSchedule(): Schedule;

  change(employee: Employee) {
    employee.classification = this.paymentClassification;
    employee.schedule = this.paymentSchedule;
  }
}
