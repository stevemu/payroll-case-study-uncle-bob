import { Employee } from '../../../Employee.ts';
import { PayrollDatabase } from '../../../database/index.ts';
import { Method } from '../../../method/Method.interface.ts';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }
  protected abstract getMethod(): Method;

  protected change(e: Employee): void {
    e.method = this.getMethod();
  }
}
