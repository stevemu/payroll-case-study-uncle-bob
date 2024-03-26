import { Employee } from '../../domain/Employee.ts';
import { Affiliation } from '../../domain/Affiliation.ts';
import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.ts';
import { ChangeEmployeeTransaction } from './ChangeEmployeeTransaction.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract recordMembership(employee: Employee): Promise<void>;

  abstract getAffiliation(): Affiliation;

  async change(employee: Employee): Promise<void> {
    await this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
    await this.db.saveEmployee(employee);
  }
}
