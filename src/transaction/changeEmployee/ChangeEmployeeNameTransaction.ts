import { Employee } from '../../Employee.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.abstract.ts';

export class ChangeEmployeeNameTransaction extends ChangeEmployeeTransaction {
  constructor(
    empId: number,
    private newName: string,
  ) {
    super(empId);
  }

  protected change(employee: Employee): void {
    employee.name = this.newName;
  }
}
