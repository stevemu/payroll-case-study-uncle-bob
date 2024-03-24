import { Employee } from '../payrollDomain/Employee.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';

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
      await this.db.saveEmployee(employee);
    }
  }
}
