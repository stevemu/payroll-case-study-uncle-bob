import { Employee } from '../../Employee.ts';
import { gPayrollDatabase } from '../../PayrollDatabase.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  recordMembership(employee: Employee): void {
    if (employee.affiliation instanceof UnionAffiliation) {
      gPayrollDatabase.deleteUnionMember(employee.affiliation.memberId);
    }
  }

  getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
}
