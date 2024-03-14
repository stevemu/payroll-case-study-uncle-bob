import { Employee } from '../../Employee';
import { gPayrollDatabase } from '../../PayrollDatabase';
import { Affiliation } from '../../affiliation/Affiliation.interface';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract';

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
