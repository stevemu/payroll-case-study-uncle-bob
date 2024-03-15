import { Employee } from '../../Employee.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { ChangeEmployeeTransaction } from '../changeEmployee/ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  abstract recordMembership(employee: Employee): void;

  abstract getAffiliation(): Affiliation;

  change(employee: Employee): void {
    this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
  }
}
