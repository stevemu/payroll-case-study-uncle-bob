import { Employee } from '@/src/Employee';
import { Method } from '@/src/method/Method.interface';
import { ChangeEmployeeTransaction } from '../ChangeEmployeeTransaction.abstract';

export abstract class ChangeMethodTransaction extends ChangeEmployeeTransaction {
  constructor(empId: number) {
    super(empId);
  }
  protected abstract getMethod(): Method;

  protected change(e: Employee): void {
    e.method = this.getMethod();
  }
}
