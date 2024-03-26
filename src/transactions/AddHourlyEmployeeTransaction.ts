import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { AddEmployeeTransaction } from './abstractTransactions/AddEmployeeTransaction.ts';
import { PayrollFactory } from '../domain/impl/factoryImpl/PayrollFactory.ts';

export class AddHourlyEmployeeTransaction extends AddEmployeeTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    name: string,
    address: string,
    private hourlyRate: number,
  ) {
    super(db, empId, name, address);
  }

  getClassification() {
    return this.payrollFactory.makeHourlyClassification(this.hourlyRate);
  }

  getSchedule() {
    return this.payrollFactory.makeWeeklySchedule();
  }
}
