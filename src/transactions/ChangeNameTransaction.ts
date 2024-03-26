import { Employee } from '../domain/abstracts/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeEmployeeTransaction } from './abstracts/ChangeEmployeeTransaction.ts';

export class ChangeNameTransaction extends ChangeEmployeeTransaction {
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
