import { Employee } from '../payrollDomain/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { ChangeEmployeeTransaction } from '../generalTransactions/ChangeEmployeeTransaction.ts';

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
