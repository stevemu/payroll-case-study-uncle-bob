import { Employee } from '../../domain/abstracts/Employee.ts';
import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.ts';
import { PaymentClassification } from '../../domain/abstracts/Classification.ts';
import { PaymentSchedule } from '../../domain/abstracts/PaymentSchedule.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.ts';

export abstract class ChangeClassificationTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract get paymentClassification(): PaymentClassification;
  abstract get paymentSchedule(): PaymentSchedule;

  async change(employee: Employee) {
    employee.classification = this.paymentClassification;
    employee.schedule = this.paymentSchedule;
    await this.db.saveEmployee(employee);
  }
}
