import { Employee } from '../../domain/Employee.ts';
import { Affiliation } from '../../domain/abstracts/Affiliation.ts';
import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract getAffiliation(): Affiliation;

  async change(employee: Employee): Promise<void> {
    employee.affiliation = this.getAffiliation();
  }
}
