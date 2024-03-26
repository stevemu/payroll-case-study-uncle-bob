import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { HourlyClassification } from '../domain/HourlyClassification.ts';
import { Transaction } from './Transaction.ts';
import { TimeCard } from '../domain/TimeCard.ts';

export class AddTimeCardTransaction implements Transaction {
  constructor(
    private db: PayrollDatabase,
    private employeeId: number,
    private date: Date,
    private hours: number,
  ) {}

  async execute(): Promise<void> {
    const employee = await this.db.getEmployee(this.employeeId);

    if (!employee) {
      throw new Error('No such employee.');
    }

    if (!(employee.classification instanceof HourlyClassification)) {
      throw new Error('Tried to add time card to non-hourly employee.');
    }

    const pc = employee.classification;
    pc.addTimeCard(new TimeCard(this.date, this.hours));
    await this.db.saveEmployee(employee);
  }
}
