import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { Transaction } from '../Transaction.interface';
import { HourlyClassification } from '@/src/classification/implementations/hourly/HourlyClassification';
import { NullEmployee } from '@/src/Employee';
import { TimeCard } from '@/src/classification/implementations/hourly/TimeCard';

export class AddTimeCardTransaction implements Transaction {
  constructor(
    private employeeId: number,
    private date: string,
    private hours: number,
  ) {}

  execute(): void {
    const employee = gpayrollDatabase.getEmployee(this.employeeId);

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
