import { Employee } from '../../Employee.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.abstract.ts';

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
