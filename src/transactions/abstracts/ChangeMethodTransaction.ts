import { Employee } from '../../domain/Employee.ts';
import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.ts';
import { PaymentMethod } from '../../domain/abstracts/PaymentMethod.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.ts';

export abstract class ChangeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }
  protected abstract getMethod(): PaymentMethod;

  protected async change(e: Employee): Promise<void> {
    e.method = this.getMethod();
    await this.db.saveEmployee(e);
  }
}
