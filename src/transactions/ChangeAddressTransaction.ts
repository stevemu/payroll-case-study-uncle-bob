import { Employee } from '../domain/abstracts/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeEmployeeTransaction } from './abstracts/ChangeEmployeeTransaction.ts';

export class ChangeAddressTransaction extends ChangeEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private newAddress: string,
  ) {
    super(db, empId);
  }

  protected change(employee: Employee): void {
    employee.address = this.newAddress;
  }
}
