import { Employee } from '@/src/Employee.ts';
import { Transaction } from '../Transaction.interface.ts';
import { gPayrollDatabase } from '@/src/PayrollDatabase.ts';

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
