import { gPayrollDatabase } from '../database/index.ts';
import { Transaction } from './Transaction.interface.ts';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(private employeeId: number) {}

  async execute(): Promise<void> {
    await gPayrollDatabase.deleteEmployee(this.employeeId);
  }
}
