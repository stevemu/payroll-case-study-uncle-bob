import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { Transaction } from '../Transaction.interface';
import { HourlyClassification } from '@/src/paymentClassification/implementations/hourly/HourlyClassification';
import { NullEmployee } from '@/src/Employee';
import { TimeCard } from '@/src/paymentClassification/implementations/hourly/TimeCard';

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
    if (!(employee.paymentClassification instanceof HourlyClassification)) {
      throw new Error('Tried to add time card to non-hourly employee.');
    }

    const pc = employee.paymentClassification;
    pc.addTimeCard(new TimeCard(this.date, this.hours));
  }
}
