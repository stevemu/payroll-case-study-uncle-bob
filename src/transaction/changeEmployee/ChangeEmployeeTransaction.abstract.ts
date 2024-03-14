import { Employee } from '@/src/Employee';
import { Transaction } from '../Transaction.interface';
import { gPayrollDatabase } from '@/src/PayrollDatabase';

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
