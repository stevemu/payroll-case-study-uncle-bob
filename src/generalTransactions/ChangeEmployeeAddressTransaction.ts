import { Employee } from '../payrollDomain/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.abstract.ts';

export class ChangeEmployeeAddressTransaction extends ChangeEmployeeTransaction {
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
