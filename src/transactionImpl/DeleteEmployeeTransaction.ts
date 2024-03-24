import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { Transaction } from '../transaction/Transaction.ts';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(
    private db: PayrollDatabase,
    private employeeId: number,
  ) {}

  async execute(): Promise<void> {
    await this.db.deleteEmployee(this.employeeId);
  }
}
