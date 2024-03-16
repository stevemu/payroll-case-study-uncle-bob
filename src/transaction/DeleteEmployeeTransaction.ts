import { gPayrollDatabase } from '../database/PayrollDatabase.ts';
import { Transaction } from './Transaction.interface.ts';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(private employeeId: number) {}

  execute(): void {
    gPayrollDatabase.deleteEmployee(this.employeeId);
  }
}
