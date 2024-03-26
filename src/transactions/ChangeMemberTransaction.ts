import { Employee } from '../domain/abstracts/Employee.ts';
import { Affiliation } from '../domain/abstracts/Affiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeAffiliationTransaction } from './abstracts/ChangeAffiliationTransaction.ts';
import { UnionAffiliation } from '../domain/UnionAffiliation.ts';

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
