import { Employee } from '../payrollDomain/Employee.ts';
import { Affiliation } from '../payrollDomain/Affiliation.ts';
import { UnionAffiliation } from '../affiliations/union/UnionAffiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

export class ChangeMemberTransaction extends ChangeAffiliationTransaction {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private memberId: number,
    private dues: number,
  ) {
    super(db, empId);
  }

  async recordMembership(employee: Employee): Promise<void> {
    await this.db.addUnionMember(this.memberId, employee);
  }

  getAffiliation(): Affiliation {
    return new UnionAffiliation(this.memberId, this.dues);
  }
}
