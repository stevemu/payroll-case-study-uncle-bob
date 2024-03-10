import { Employee } from '@/src/Employee';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.base';

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
