import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.base';
import { Employee } from '@/src/Employee';

export class ChangeEmployeeAddressTransaction extends ChangeEmployeeTransaction {
  constructor(
    empId: number,
    private newAddress: string,
  ) {
    super(empId);
  }

  protected change(employee: Employee): void {
    employee.address = this.newAddress;
  }
}
