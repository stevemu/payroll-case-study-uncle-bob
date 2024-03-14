import { Employee } from '../../Employee';
import { gPayrollDatabase } from '../../PayrollDatabase';
import { Transaction } from '../Transaction.interface';

export abstract class ChangeEmployeeTransaction extends Transaction {
  constructor(private empId: number) {
    super();
  }

  protected abstract change(employee: Employee): void;

  execute(): void {
    const employee = gPayrollDatabase.getEmployee(this.empId);
    if (employee) {
      this.change(employee);
    }
  }
}
