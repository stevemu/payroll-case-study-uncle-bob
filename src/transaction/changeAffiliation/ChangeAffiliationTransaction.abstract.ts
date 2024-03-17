import { Employee } from '../../Employee.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { PayrollDatabase } from '../../database/index.ts';
import { ChangeEmployeeTransaction } from '../changeEmployee/ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract recordMembership(employee: Employee): Promise<void>;

  abstract getAffiliation(): Affiliation;

  async change(employee: Employee): Promise<void> {
    await this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
  }
}
