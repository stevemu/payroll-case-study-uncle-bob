import { Employee } from '../payrollDomain/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../payrollDomain/Classification.abstract.ts';
import { Schedule } from '../payrollDomain/Schedule.interface.ts';
import { ChangeEmployeeTransaction } from '../generalTransactions/ChangeEmployeeTransaction.abstract.ts';

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
