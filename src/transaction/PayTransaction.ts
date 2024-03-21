import { PayCheck } from '../PayCheck.ts';
import { PayrollDatabase } from '../database/index.ts';
import { Transaction } from './Transaction.interface.ts';

export class PayTransaction extends Transaction {
  private payCheck: Map<number, PayCheck> = new Map();

  constructor(
    private db: PayrollDatabase,
    private payDate: Date,
  ) {
    super();
  }

  async execute(): Promise<void> {
    const employees = await this.db.getAllEmployees();

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

  getPayChecks(): PayCheck[] {
    return Array.from(this.payCheck.values());
  }
}
