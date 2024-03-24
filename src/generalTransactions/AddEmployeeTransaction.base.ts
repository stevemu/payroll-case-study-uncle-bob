import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { Employee } from '../payrollDomain/Employee.ts';
import { PaymentClassification } from '../payrollDomain/Classification.abstract.ts';
import { HoldMethod } from '../methods/HoldMethod.ts';
import { Schedule } from '../payrollDomain/Schedule.interface.ts';
import { Transaction } from '../payrollDomain/Transaction.interface.ts';

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
  abstract getSchedule(): Schedule;

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
