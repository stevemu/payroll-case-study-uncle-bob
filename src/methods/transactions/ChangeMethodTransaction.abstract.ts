import { Employee } from '../../payrollDomain/Employee.ts';
import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';
import { Method } from '../../payrollDomain/Method.interface.ts';
import { ChangeEmployeeTransaction } from '../../payrollDomain/ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }
  protected abstract getMethod(): Method;

  protected async change(e: Employee): Promise<void> {
    e.method = this.getMethod();
    await this.db.saveEmployee(e);
  }
}
