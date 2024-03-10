import { gpayrollDatabase } from '../../PayrollDatabase';
import { Employee } from '../../Employee';
import { Classification } from '../../classification/Classification.interface';
import { HoldMethod } from '../../method/HoldMethod';
import { Schedule } from '../../schedule/Schedule.interface';
import { Transaction } from '../Transaction.interface';

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
    const pm = new HoldMethod();
    const e = new Employee(this.empId, this.name, this.address);
    e.classification = pc;
    e.schedule = ps;
    e.method = pm;
    gpayrollDatabase.addEmployee(this.empId, e);
  }
}
