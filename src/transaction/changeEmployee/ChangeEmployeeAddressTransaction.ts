import { Employee } from '../../database/Employee.ts';
import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';
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
