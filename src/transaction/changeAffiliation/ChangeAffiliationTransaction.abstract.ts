import { Employee } from '../../Employee';
import { Affiliation } from '../../affiliation/Affiliation.interface';
import { ChangeEmployeeTransaction } from '../changeEmployee/ChangeEmployeeTransaction.abstract';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  abstract recordMembership(employee: Employee): void;

  abstract getAffiliation(): Affiliation;

  change(employee: Employee): void {
    this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
  }
}
