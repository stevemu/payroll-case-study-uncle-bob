import { Employee } from '@/src/Employee';
import { Affiliation } from '@/src/affiliation/Affiliation.interface';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract';
import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { UnionAffiliation } from '@/src/affiliation/union/UnionAffiliation';

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
