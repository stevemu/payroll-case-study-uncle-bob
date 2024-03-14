import { Employee } from '@/src/Employee.ts';
import { ChangeEmployeeTransaction } from '../changeEmployee/ChangeEmployeeTransaction.abstract.ts';
import { Affiliation } from '@/src/affiliation/Affiliation.interface.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  abstract recordMembership(employee: Employee): void;

  abstract getAffiliation(): Affiliation;

  change(employee: Employee): void {
    this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
  }
}
