import { Employee } from '@/src/Employee.ts';
import { Affiliation } from '@/src/affiliation/Affiliation.interface.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';
import { gPayrollDatabase } from '@/src/PayrollDatabase.ts';
import { UnionAffiliation } from '@/src/affiliation/union/UnionAffiliation.ts';

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
