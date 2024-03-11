import { PayCheck } from '../PayCheck';
import { gPayrollDatabase } from '../PayrollDatabase';
import { Transaction } from './Transaction.interface';

export class PayTransaction extends Transaction {
  private payCheck: Map<number, PayCheck> = new Map();

  constructor(private payDate: Date) {
    super();
  }

  execute(): void {
    const employees = gPayrollDatabase.getAllEmployees();

    for (const employee of employees) {
      const isPayDate = employee.isPayDate(this.payDate);
      if (isPayDate) {
        const payCheck = employee.payDay(this.payDate);
        this.payCheck.set(employee.empId, payCheck);
      }
    }
  }

  getPayCheck(empId: number): PayCheck | null {
    return this.payCheck.get(empId) || null;
  }
}
