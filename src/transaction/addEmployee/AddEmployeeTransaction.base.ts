import { gPayrollDatabase } from '../../database/PayrollDatabase.ts';
import { Employee } from '../../Employee.ts';
import { Classification } from '../../paymentClassification/Classification.abstract.ts';
import { HoldMethod } from '../../method/HoldMethod.ts';
import { Schedule } from '../../schedule/Schedule.interface.ts';
import { Transaction } from '../Transaction.interface.ts';

export abstract class AddEmployeeTransaction extends Transaction {
  constructor(
    protected empId: number,
    protected name: string,
    protected address: string,
  ) {
    super();
  }

  abstract getClassification(): Classification;
  abstract getSchedule(): Schedule;

  execute(): void {
    const pc = this.getClassification();
    const ps = this.getSchedule();
    const pm = new HoldMethod('Office');
    const e = new Employee(this.empId, this.name, this.address);
    e.classification = pc;
    e.schedule = ps;
    e.method = pm;
    gPayrollDatabase.addEmployee(this.empId, e);
  }
}
