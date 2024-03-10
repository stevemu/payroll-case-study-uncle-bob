import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.abstract';
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
