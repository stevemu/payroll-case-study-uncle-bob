import { Employee } from '../../Employee.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { PayrollDatabase } from '../../database/index.ts';
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
