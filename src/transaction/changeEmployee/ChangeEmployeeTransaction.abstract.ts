import { Employee } from '../../Employee.ts';
import { gPayrollDatabase } from '../../database/index.ts';
import { Transaction } from '../Transaction.interface.ts';

export abstract class ChangeEmployeeTransaction extends Transaction {
  constructor(private empId: number) {
    super();
  }

  protected abstract change(employee: Employee): void;

  async execute(): Promise<void> {
    const employee = await gPayrollDatabase.getEmployee(this.empId);
    if (employee) {
      this.change(employee);
    }
  }
}
