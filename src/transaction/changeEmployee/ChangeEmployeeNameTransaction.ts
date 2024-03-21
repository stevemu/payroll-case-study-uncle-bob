import { Employee } from '../../Employee.ts';
import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.abstract.ts';

export class ChangeEmployeeNameTransaction extends ChangeEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private newName: string,
  ) {
    super(db, empId);
  }

  protected change(employee: Employee): void {
    employee.name = this.newName;
  }
}
