import { Employee } from '../../Employee.ts';
import { gPayrollDatabase } from '../../database/index.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

export class ChangeMemberTransaction extends ChangeAffiliationTransaction {
  constructor(
    empId: number,
    private memberId: number,
    private dues: number,
  ) {
    super(empId);
  }

  recordMembership(employee: Employee): void {
    gPayrollDatabase.addUnionMember(this.memberId, employee);
  }

  getAffiliation(): Affiliation {
    return new UnionAffiliation(this.memberId, this.dues);
  }
}
