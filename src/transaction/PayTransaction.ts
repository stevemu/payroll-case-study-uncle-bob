import { PayCheck } from '../PayCheck.ts';
import { gPayrollDatabase } from '../database/PayrollDatabase.ts';
import { Transaction } from './Transaction.interface.ts';

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
        const payCheck = new PayCheck(employee.getPayPeriodStartDate(this.payDate), this.payDate);
        employee.payDay(payCheck);
        this.payCheck.set(employee.empId, payCheck);
      }
    }
  }

  getPayCheck(empId: number): PayCheck | null {
    return this.payCheck.get(empId) || null;
  }
}
