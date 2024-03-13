import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { Transaction } from './Transaction.interface';
import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification';
import { NullEmployee } from '@/src/Employee';
import { TimeCard } from '@/src/paymentClassification/hourly/TimeCard';

export class AddTimeCardTransaction implements Transaction {
  constructor(
    private employeeId: number,
    private date: Date,
    private hours: number,
  ) {}

  execute(): void {
    const employee = gPayrollDatabase.getEmployee(this.employeeId);

    if (employee instanceof NullEmployee) {
      throw new Error('No such employee.');
    }
    if (!(employee.classification instanceof HourlyClassification)) {
      throw new Error('Tried to add time card to non-hourly employee.');
    }

    const pc = employee.classification;
    pc.addTimeCard(new TimeCard(this.date, this.hours));
  }
}
