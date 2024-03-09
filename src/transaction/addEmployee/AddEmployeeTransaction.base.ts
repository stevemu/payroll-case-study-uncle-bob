import { gpayrollDatabase } from '../../PayrollDatabase';
import { Employee } from '../../employee/Employee.base';
import { PaymentClassification } from '../../paymentClassification/PaymentClassification.interface';
import { HoldMethod } from '../../paymentMethod/implementation/HoldMethod';
import { PaymentSchedule } from '../../paymentSchedule/PaymentSchedule.interface';
import { Transaction } from '../Transaction.interface';

export abstract class AddEmployeeTransaction extends Transaction {
  constructor(
    protected empId: number,
    protected name: string,
    protected address: string,
  ) {
    super();
  }

  abstract getClassification(): PaymentClassification;
  abstract getSchedule(): PaymentSchedule;

  execute(): void {
    const pc = this.getClassification();
    const ps = this.getSchedule();
    const pm = new HoldMethod();
    const e = new Employee(this.empId, this.name, this.address);
    e.paymentClassification = pc;
    e.paymentSchedule = ps;
    e.paymentMethod = pm;
    gpayrollDatabase.addEmployee(this.empId, e);
  }
}
