import { PayrollDatabase } from '../database/index.ts';
import { Transaction } from './Transaction.interface.ts';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(
    private db: PayrollDatabase,
    private employeeId: number,
  ) {}

  async execute(): Promise<void> {
    await this.db.deleteEmployee(this.employeeId);
  }
}
