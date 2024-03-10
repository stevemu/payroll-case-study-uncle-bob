import { Employee } from '@/src/Employee';
import { ChangeEmployeeTransaction } from '../changeEmployee/ChangeEmployeeTransaction.abstract';
import { Affiliation } from '@/src/affiliation/Affiliation.interface';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  abstract recordMembership(employee: Employee): void;

  abstract getAffiliation(): Affiliation;

  change(employee: Employee): void {
    this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
  }
}
