import { gPayrollDatabase } from '../PayrollDatabase';
import { HourlyClassification } from '../paymentClassification/hourly/HourlyClassification';
import { TimeCard } from '../paymentClassification/hourly/TimeCard';
import { Transaction } from './Transaction.interface';

export class AddTimeCardTransaction implements Transaction {
  constructor(
    private employeeId: number,
    private date: Date,
    private hours: number,
  ) {}

  execute(): void {
    const employee = gPayrollDatabase.getEmployee(this.employeeId);

    if (!employee) {
      throw new Error('No such employee.');
    }

    if (!(employee.classification instanceof HourlyClassification)) {
      throw new Error('Tried to add time card to non-hourly employee.');
    }

    const pc = employee.classification;
    pc.addTimeCard(new TimeCard(this.date, this.hours));
  }
}
