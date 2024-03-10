import { gPayrollDatabase } from '../PayrollDatabase';
import { Transaction } from './Transaction.interface';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(private employeeId: number) {}

  execute(): void {
    gPayrollDatabase.deleteEmployee(this.employeeId);
  }
}
