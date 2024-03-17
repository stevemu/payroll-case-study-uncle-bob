import { Employee } from '../../Employee.ts';
import { PayrollDatabase } from '../../database/index.ts';
import { Transaction } from '../Transaction.interface.ts';

export abstract class ChangeEmployeeTransaction extends Transaction {
  constructor(
    protected db: PayrollDatabase,
    private empId: number,
  ) {
    super();
  }

  protected abstract change(employee: Employee): void;

  async execute(): Promise<void> {
    const employee = await this.db.getEmployee(this.empId);
    if (employee) {
      this.change(employee);
    }
  }
}
