import { Employee } from '../../Employee';
import { gPayrollDatabase } from '../../PayrollDatabase';
import { Affiliation } from '../../affiliation/Affiliation.interface';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract';

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
