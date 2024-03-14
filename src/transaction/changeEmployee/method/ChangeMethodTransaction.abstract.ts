import { Employee } from '@/src/Employee.ts';
import { Method } from '@/src/method/Method.interface.ts';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(empId: number) {
    super(empId);
  }
  protected abstract getMethod(): Method;

  protected change(e: Employee): void {
    e.method = this.getMethod();
  }
}
