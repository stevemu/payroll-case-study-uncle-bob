import { Employee } from '../../Employee.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { ChangeEmployeeTransaction } from '../changeEmployee/ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  abstract recordMembership(employee: Employee): Promise<void>;

  abstract getAffiliation(): Affiliation;

  async change(employee: Employee): Promise<void> {
    await this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
  }
}
