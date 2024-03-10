import { Employee, NullEmployee } from '@/src/Employee';
import { Transaction } from '../../Transaction.interface';
import { gpayrollDatabase } from '@/src/PayrollDatabase';

export abstract class ChangeEmployeeTransaction extends Transaction {
  constructor(private empId: number) {
    super();
  }

  protected abstract change(employee: Employee): void;

  execute(): void {
    const employee = gpayrollDatabase.getEmployee(this.empId);
    if (!(employee instanceof NullEmployee)) {
      this.change(employee);
    }
  }
}
