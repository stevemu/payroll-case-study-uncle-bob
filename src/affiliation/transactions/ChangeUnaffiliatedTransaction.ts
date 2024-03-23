import { Employee } from '../../payrollDomain/employee/Employee.ts';
import { Affiliation } from '../../payrollDomain/Affiliation.interface.ts';
import { NoAffiliation } from '../affiliations/noAffiliation/NoAffiliation.ts';
import { UnionAffiliation } from '../affiliations/union/UnionAffiliation.ts';
import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  async recordMembership(employee: Employee): Promise<void> {
    if (employee.affiliation instanceof UnionAffiliation) {
      await this.db.deleteUnionMember(employee.affiliation.memberId);
    }
  }

  getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
}
