import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { Employee } from '../payrollDomain/Employee.ts';
import { PaymentClassification } from '../payrollDomain/Classification.ts';
import { HoldMethod } from '../payrollImpl/HoldMethod.ts';
import { PaymentSchedule } from '../payrollDomain/PaymentSchedule.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';

export abstract class AddEmployeeTransaction extends Transaction {
  constructor(
    protected db: PayrollDatabase,
    protected empId: number,
    protected name: string,
    protected address: string,
  ) {
    super();
  }

  abstract getClassification(): PaymentClassification;
  abstract getSchedule(): PaymentSchedule;

  async execute(): Promise<void> {
    const pc = this.getClassification();
    const ps = this.getSchedule();
    const pm = new HoldMethod('Office');
    const e = new Employee(this.empId, this.name, this.address);
    e.classification = pc;
    e.schedule = ps;
    e.method = pm;
    await this.db.addEmployee(this.empId, e);
  }
}
