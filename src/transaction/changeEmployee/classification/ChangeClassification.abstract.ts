import { Employee } from '../../../database/Employee.ts';
import { PayrollDatabase } from '../../../database/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../../../paymentClassification/Classification.abstract.ts';
import { Schedule } from '../../../schedule/Schedule.interface.ts';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeClassification extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract get paymentClassification(): PaymentClassification;
  abstract get paymentSchedule(): Schedule;

  async change(employee: Employee) {
    employee.classification = this.paymentClassification;
    employee.schedule = this.paymentSchedule;
    await this.db.saveEmployee(employee);
  }
}
