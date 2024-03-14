import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.abstract.ts';
import { Employee } from '@/src/Employee.ts';

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
