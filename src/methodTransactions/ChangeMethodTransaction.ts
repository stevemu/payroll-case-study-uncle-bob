import { Employee } from '../payrollDomain/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentMethod } from '../payrollDomain/PaymentMethod.ts';
import { ChangeEmployeeTransaction } from '../generalTransactions/ChangeEmployeeTransaction.ts';

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
